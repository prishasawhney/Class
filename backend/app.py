import uvicorn
from pymongo import MongoClient
import shutil
import tempfile
from langchain_community.document_loaders import PyPDFLoader
from langchain.schema import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from datetime import datetime,date
import time
import json
from helper import *
from models import *
import uuid
from passlib.hash import bcrypt
import google.generativeai as genai
from google.ai.generativelanguage_v1beta.types import content
from scraper import *
from utils import *
load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['app_db']
api_key = os.getenv('GEMINI_API')
genai.configure(api_key=api_key)
# FastAPI Configuration
app = FastAPI(docs_url="/")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def read_root():
    return {"message": "Hello World"}


def extract_keywords_from_text(text):
    model = genai.GenerativeModel(model_name='gemini-1.5-flash-latest')
    prompt=f"""Prompt:
    Analyze the given text and identify the most specific topic or keyword that describes its content. Ensure the keyword is detailed enough to capture the full context. For example, if the text is about the human heart, return "human heart" instead of just "heart," or if the text is about recursion in programming, return "recursion programming." Provide the answer in a single word or concise phrase.

    Text:{text}

    Answer:"""
    response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
    data = json.loads(response.text)
    return data['keyword']

@app.post('/signup')
async def create_an_account(user_data: SignUpSchema):
    email = user_data.email
    password = user_data.password
    username = user_data.username

    # Check if user already exists
    existing_user = db.Users.find_one({"username": username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Display name already exists.")

    hashed_password = bcrypt.hash(password)

    # Insert user
    user = {
        "username": username,
        "email": email,
        "password": hashed_password,
        "notes": [],
        "todos": [],
        "taskTypes": [{
            "taskTypeKey": str(uuid.uuid4()),
            "taskTypeName": "Explore",
            "taskTypeColor": "#A4E1FF"
        }]
    }
    db.Users.insert_one(user)

    # Create default note and todo
    today = datetime.today().strftime('%d-%m-%Y')
    default_note = {
        "noteKey": str(uuid.uuid4()),  # Generate a unique key for the note
        "noteTitle": "Welcome to C.L.A.S.S.",
        "noteText": FirstNote(),
        "creationDate": today,
    }
    default_todo = {
        "taskKey": str(uuid.uuid4()),  # Generate a unique key for the task
        "taskName": "Kickoff Quest",
        "taskDescription": "Dive into the experience — explore the website and discover what it has to offer!",
        "taskType": "Explore",
        "dueDate": today,
        "taskColor": "#A4E1FF",
        "isCompleted": False
    }

    db.Users.update_one({"username": username}, {"$push": {"notes": default_note, "todos": default_todo}})

    return JSONResponse(content={"username": username}, status_code=201)

@app.post('/login')
async def create_access_token(user_data: LoginSchema):
    email = user_data.email
    raw_password = user_data.password  # Raw password from user

    # Find the user in the database by email
    user = db.Users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="No Such User")

    # Verify the provided password against the hashed password
    if not bcrypt.verify(raw_password, user['password']):
        raise HTTPException(status_code=400, detail="Invalid Credentials")

    return JSONResponse(content={"username": user['username']}, status_code=200)


@app.post("/forgot-password/request-otp")
async def request_otp(payload: EmailRequest):
    """Request an OTP for password reset"""
    email = payload.email
    
    user = db.Users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    otp = generate_otp()
    generation_time = datetime.now()
    
    
    db.Users.update_one(
        {"email": email},
        {"$set": {"otp": otp, "otpGenerationTime": generation_time}}
    )
    
    
    success, message = send_otp_email(email, otp)
    
    if not success:
        raise HTTPException(status_code=500, detail=message)
    
    return {"message": "OTP sent successfully"}

@app.post("/forgot-password/verify-otp")
async def verify_otp_api(verify_otp: VerifyOtpSchema):
    
    user = db.Users.find_one({"email": verify_otp.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    stored_otp = user.get("otp")
    generation_time = user.get("otpGenerationTime")

    if not stored_otp or not generation_time:
        raise HTTPException(status_code=400, detail="No OTP found. Please request a new one.")

    if datetime.now() - generation_time > timedelta(minutes=10):
        db.Users.update_one(
            {"email": verify_otp.email},
            {"$unset": {"otp": "", "otpGenerationTime": ""}}
        )
        raise HTTPException(status_code=400, detail="OTP expired. Please request a new one.")

    if verify_otp.otp != stored_otp:
        raise HTTPException(status_code=400, detail="Incorrect OTP. Please try again.")

    db.Users.update_one(
        {"email": verify_otp.email},
        {"$unset": {"otp": "", "otpGenerationTime": ""}}
    )

    return {"message": "OTP verified successfully", "status": True}


@app.post("/forgot-password/reset-password")
async def reset_password_api(payload: ResetPasswordSchema):
    if payload.new_password != payload.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match.")
    
    user = db.Users.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Hash the new password
    hashed_password = bcrypt.hash(payload.new_password)
    
    # Update in DB
    db.Users.update_one(
        {"email": payload.email},
        {"$set": {"password": hashed_password}}
    )
    
    return {"message": "Password reset successfully", "status": True}


@app.post("/notes/create")
async def create_note(note: NoteSchema):
    username = note.username
    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_note = {
        "noteKey": str(uuid.uuid4()),  # Generate a unique key for the note
        "noteTitle": note.noteTitle,
        "noteText": note.noteText,
        "creationDate": datetime.today().strftime('%d-%m-%Y')
    }

    db.Users.update_one({"username": username}, {"$push": {"notes": new_note}})
    return {"message": "Note created successfully","noteKey":new_note["noteKey"]}

@app.get("/notes/read")
async def read_notes(username: str):
    user = db.Users.find_one({"username": username}, {"notes": 1, "_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user.get("notes", [])

@app.put("/notes/update")
async def update_note(note: UpdateNoteSchema):
    username = note.username
    note_key = note.noteKey

    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.Users.update_one(
        {"username": username, "notes.noteKey": note_key},
        {"$set": {"notes.$.noteTitle":note.noteTitle, "notes.$.noteText": note.noteText}}
    )

    return {"message": "Note updated successfully"}

@app.delete("/notes/delete")
async def delete_notes(note: DeleteNoteSchema):
    username = note.username
    note_key = note.noteKey

    db.Users.update_one({"username": username}, {"$pull": {"notes": {"noteKey": note_key}}})
    return {"message": "Note deleted successfully"}

@app.post("/todo/create")
async def create_todo(todo: TodoSchema):
    username = todo.username
    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_todo = {
        "taskKey": str(uuid.uuid4()),  # Generate a unique key for the task
        "taskName": todo.taskName,
        "taskDescription": todo.taskDescription,
        "taskType": todo.taskType,
        "dueDate": todo.dueDate,
        "taskColor": todo.taskColor,
        "isCompleted": False
    }

    db.Users.update_one({"username": username}, {"$push": {"todos": new_todo}})
    return {"message": "Todo created successfully", "taskKey":new_todo["taskKey"]}

@app.get("/todo/read")
async def read_todos(username: str):
    user = db.Users.find_one({"username": username}, {"todos": 1, "_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user.get("todos", [])

@app.put("/todo/complete")
async def update_todo_completed(todo: CompleteTodoSchema):
    username = todo.username
    task_key = todo.taskKey

    # Fetch the user and validate existence
    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Find the task in todos
    task = next((t for t in user.get("todos", []) if t["taskKey"] == task_key), None)
    if not task:
        raise HTTPException(status_code=404, detail="Todo not found")

    # Toggle the completion status
    new_completion_status = not task.get("isCompleted", False)

    # Update the task's completion status
    db.Users.update_one(
        {"username": username, "todos.taskKey": task_key},
        {"$set": {"todos.$.isCompleted": new_completion_status}}
    )

    # Handle Roadmap tasks
    if task.get("taskType") == "Roadmap" and new_completion_status:
        # Get and sort roadmap tasks by due date
        roadmap_tasks = user.get("roadmap", [])
        roadmap_tasks.sort(key=lambda x: parse_due_date(x["dueDate"]))

        # Add the next task from the roadmap to todos if available
        if roadmap_tasks:
            next_task = roadmap_tasks[0]

            # Add the next task to todos and remove it from the roadmap
            db.Users.update_one(
                {"username": username},
                {
                    "$push": {"todos": next_task},
                    "$pull": {"roadmap": {"taskKey": next_task["taskKey"]}}
                }
            )

            return {
                "message": "Todo updated successfully. Next roadmap task added to your todos.",
                "nextTask": next_task
            }

    return {"message": "Todo updated successfully"}


@app.put("/todo/update")
async def update_todo(todo: UpdateTodoSchema):
    username = todo.username
    task_key = todo.taskKey  # Ensure the request includes taskKey

    # Find the user
    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Find the task in user's todos
    task = next((t for t in user.get("todos", []) if t["taskKey"] == task_key), None)
    if not task:
        raise HTTPException(status_code=404, detail="Todo not found")

    # Update task fields while keeping the same taskKey
    updated_task = {
        "taskKey": task_key,  # Keep the original taskKey
        "taskName": todo.taskName,
        "taskDescription": todo.taskDescription,
        "dueDate": todo.dueDate,
        "taskType": todo.taskType,
        "taskColor": todo.taskColor,
        "isCompleted": task["isCompleted"]  # Retain completion status
    }

    # Update the specific todo in the database
    db.Users.update_one(
        {"username": username, "todos.taskKey": task_key},
        {"$set": {"todos.$": updated_task}}
    )

    return {"message": "Todo updated successfully"}


@app.delete("/todo/delete")
async def delete_todo(todo: DeleteTodoSchema):
    username = todo.username
    task_key = todo.taskKey

    db.Users.update_one({"username": username}, {"$pull": {"todos": {"taskKey": task_key}}})

    return {"message": "Todo deleted successfully"}

@app.post("/taskType/create")
async def create_task_type(taskType: TaskTypeSchema):
    username = taskType.username
    user = db.Users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_task_type = {
        "taskTypeKey": str(uuid.uuid4()), # Generate a unique key for the task type
        "taskTypeName": taskType.taskTypeName,
        "taskTypeColor": taskType.taskTypeColor
    }

    db.Users.update_one({"username": username}, {"$push": {"taskTypes": new_task_type}})
    return {"message": "Task type created successfully", "taskTypeKey": new_task_type["taskTypeKey"]}

@app.get("/taskType/read")
async def read_task_types(username: str):
    user = db.Users.find_one({"username": username}, {"taskTypes": 1, "_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user.get("taskTypes", [])

@app.delete("/taskType/delete")
async def delete_task_type(taskType: DeleteTaskTypeSchema):
    username = taskType.username
    task_type_key = taskType.taskTypeKey

    db.Users.update_one({"username": username}, {"$pull": {"taskTypes": {"taskTypeKey": task_type_key}}})
    
    return {"message": "Task type deleted successfully"}

@app.post("/post/create")
async def create_post(post: PostSchema):
    new_post = {
        "postDescription": post.postDescription,
        "postCreatedBy": post.postCreatedBy,
        "postCreatedOn": post.postCreatedOn,
        "postLikesCount": 0,
        "likedByUsers": [],
        "postKey": None
    }

    result = db.Posts.insert_one(new_post)
    db.Posts.update_one({"_id": result.inserted_id}, {"$set": {"postKey": str(result.inserted_id)}})

    return {"message": str(result.inserted_id)}

@app.get("/post/read")
async def read_posts():
    posts = list(db.Posts.find({}, {"_id": 0}))
    return posts

@app.post("/post/like-unlike")
async def like_post(like: LikeSchema):
    post = db.Posts.find_one({"postKey": like.postKey})

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if like.username in post['likedByUsers']:
        # Unlike the post
        db.Posts.update_one(
            {"postKey": like.postKey},
            {"$pull": {"likedByUsers": like.username}, "$inc": {"postLikesCount": -1}}
        )
        return {"message": "Post unliked"}
    else:
        # Like the post
        db.Posts.update_one(
            {"postKey": like.postKey},
            {"$push": {"likedByUsers": like.username}, "$inc": {"postLikesCount": 1}}
        )
        return {"message": "Post liked"}

@app.post("/comment/create")
async def create_comment(comment: CommentSchema):
    new_comment = {
        "commentDescription": comment.commentDescription,
        "commentCreatedBy": comment.commentCreatedBy,
        "commentPostKey": comment.commentPostKey,
        "commentUpvotes": 0,
        "commentDownvotes": 0,
        "upvotedByUsers": [],
        "downvotedByUsers": [],
        "commentKey": None
    }

    result = db.Comments.insert_one(new_comment)
    db.Comments.update_one({"_id": result.inserted_id}, {"$set": {"commentKey": str(result.inserted_id)}})

    return {"message": str(result.inserted_id)}

@app.get("/comment/read")
async def read_comments():
    comments = list(db.Comments.find({}, {"_id": 0}))
    return comments

@app.post("/comment/upvote")
async def upvote_comment(vote: VoteSchema):
    comment = db.Comments.find_one({"commentKey": vote.commentKey})

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found") 

    if vote.username not in comment['upvotedByUsers']:
        # Upvote the comment
        db.Comments.update_one(
            {"commentKey": vote.commentKey},
            {"$push": {"upvotedByUsers": vote.username}, "$inc": {"commentUpvotes": 1}}
        )
        if vote.username in comment['downvotedByUsers']:
            db.Comments.update_one(
                {"commentKey": vote.commentKey},
                {"$pull": {"downvotedByUsers": vote.username}, "$inc": {"commentDownvotes": -1}}
            )
        return {"message": "Comment upvoted"}
    else:
        # Comment already upvoted, remove the upvote
        db.Comments.update_one(
            {"commentKey": vote.commentKey},
            {"$pull": {"upvotedByUsers": vote.username}, "$inc": {"commentUpvotes": -1}}
        )
        return {"message": "User already upvoted this comment. Upvote removed"}

@app.post("/comment/downvote")
async def downvote_comment(vote: VoteSchema):
    comment = db.Comments.find_one({"commentKey": vote.commentKey})

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if vote.username not in comment['downvotedByUsers']:
        # Downvote the comment
        db.Comments.update_one(
            {"commentKey": vote.commentKey},
            {"$push": {"downvotedByUsers": vote.username}, "$inc": {"commentDownvotes": 1}}
        )
        if vote.username in comment['upvotedByUsers']:
            db.Comments.update_one(
                {"commentKey": vote.commentKey},
                {"$pull": {"upvotedByUsers": vote.username}, "$inc": {"commentUpvotes": -1}}
            )
        return {"message": "Comment downvoted"}
    else:
        # Comment already downvoted, remove the downvote
        db.Comments.update_one(
            {"commentKey": vote.commentKey},
            {"$pull": {"downvotedByUsers": vote.username}, "$inc": {"commentDownvotes": -1}}
        )
        return {"message": "User already downvoted this comment. Downvote removed"}


@app.post("/flashcards")
async def generate_flashcards(noteKey: str = Form(None), username: str = Form(None), file: UploadFile = File(None)):
    """
    Generates flashcards based on a note's text or a provided PDF file.
    
    Args:
        flashcard_data (FlashCardRequestSchema): A Pydantic model to validate input.

    Returns:
        JSON response containing flashcards.
    """
    username = username
    note_key = noteKey
    file = file

    content = ""

    if note_key:
        # Fetch note by noteKey
        # Check if the user exists
        user = db.Users.find_one({"username": username})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        note = next(
            (note for note in user.get("notes", []) if note["noteKey"] == note_key),
            None
        )
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        content = note.get("noteText", "")

    elif file:
        # Process uploaded file
        with tempfile.TemporaryDirectory() as tmpdirname:
            file_location = os.path.join(tmpdirname, file.filename)
            with open(file_location, "wb") as f:
                shutil.copyfileobj(file.file, f)

            # Extract content from the PDF
            loader = PyPDFLoader(file_location)
            docs = loader.load()
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=2000)
            splits = text_splitter.split_documents(docs)
            content = "\n\n".join([split.page_content for split in splits])

    else:
        raise HTTPException(status_code=400, detail="No noteKey or file provided")

    # Generate flashcards using the model
    prompt_template = PromptTemplate(
        input_variables=["notes"],
        template=(
            "Act as a teacher and consider the following text:\n\n{notes}\n\n"
            "Generate a list of question-answer pairs of varying difficulties. "
            "Questions should include fill-in-the-blank and True/False types. "
            "Output a JSON array where each element contains 'question', 'answer', and 'hint'."
        ),
    )
    prompt = prompt_template.format(notes=content)

    model = genai.GenerativeModel(
        "gemini-1.5-flash",
        generation_config={
            "response_mime_type": "application/json",
            "response_schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "question": {"type": "string"},
                        "answer": {"type": "string"},
                        "hint": {"type": "string"},
                    },
                    "required": ["question", "answer", "hint"],
                },
            },
        },
    )
    response = model.generate_content(prompt)

    try:
        flashcards = json.loads(response.text)
        return {"message": "Flashcards generated successfully", "flashcards": flashcards}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing model response: {str(e)}")


@app.post("/upload-video")
async def process_video(file: UploadFile = File(...)):
    # model = genai.GenerativeModel('gemini-1.5-pro-latest',
    #                           generation_config={"response_mime_type": "application/json",
    #                                              "response_schema": VideoAnalysis})
    model = genai.GenerativeModel(
    "gemini-1.5-flash",
    generation_config={
        "response_mime_type": "application/json",
        "response_schema": {
            "type": "object",
            "properties": {
                "vocabulary": {"type": "integer"},
                "confidence_level": {"type": "integer"},
                "engaging_ability": {"type": "integer"},
                "speaking_style": {"type": "integer"},
                "overall_average": {"type": "integer"},
                "review": {"type": "string"},
            },
            "required": [
                "vocabulary",
                "confidence_level",
                "engaging_ability",
                "speaking_style",
                "overall_average",
                "review",
            ],
        },
    },
)


    prompt= vidPrompt()

    with tempfile.TemporaryDirectory() as tmpdirname:
        # Save the uploaded video file
        file_location = os.path.join(tmpdirname, file.filename)
        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Upload the video file to Google Generative AI
        video_file = genai.upload_file(path=file_location)

        while video_file.state.name == "PROCESSING":
            
            time.sleep(10)
            video_file = genai.get_file(video_file.name)
    
        if video_file.state.name == "FAILED":
            raise ValueError(video_file.state.name)

        # Generate content using the uploaded video and the prompt
        
        response = model.generate_content([video_file, prompt])
        
    return json.loads(response.text)

@app.post("/scorer")
async def generate_resumeReview(file: UploadFile = File(None), jobDescription: str = Form(...)):
    
    content = ""

    if file and file.filename != "":
        # Process the uploaded PDF file
        with tempfile.TemporaryDirectory() as tmpdirname:
            file_location = os.path.join(tmpdirname, file.filename)
            with open(file_location, "wb") as f:
                shutil.copyfileobj(file.file, f)
            
            loader = PyPDFLoader(file_location)
            docs = loader.load()
            
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=2000)
            splits = text_splitter.split_documents(docs)
            
            content = '\n\n\n\n'.join([split.page_content for split in splits])
            

    else:
        raise HTTPException(status_code=400, detail="No PDF uploaded.")

    # Proceed with the prompt creation and model interaction
    prompt_template = resumeScorerPrompt(docs,jobDescription)

    model = genai.GenerativeModel(
        'gemini-1.5-flash',
        generation_config={
            "response_mime_type": "application/json",
            "response_schema": ResumeScore
        }
    )
    
    response = model.generate_content(prompt_template)
    
    
    return json.loads(response.text)


@app.post("/imagesolver/")
async def generate_response(userPrompt: str = Form(default=""), file: UploadFile = File(None), username: str = Form(...)):
    
    user = db.Users.find_one({"username": username})
    chat_history = user.get("chatHistory", []) if user else []
    
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    
    if file:
        file_extension = file.filename.split(".")[-1].lower()
        
        if file_extension in ["pdf", "txt", "docx"]:
            file_text = extract_text_from_file(file)
            prompt = f"Context: {file_text}\n\nUser's Question: {userPrompt}"
            
            chat = model.start_chat(history=[])
            response = chat.send_message(prompt)
            
            chat_history.append({"role": "user", "parts": {"text": prompt}})
            
        elif file_extension in ["jpg", "jpeg", "png"]:  # Image handling (existing logic)
            
            with tempfile.TemporaryDirectory() as tmpdirname:
                file_location = os.path.join(tmpdirname, file.filename)
                with open(file_location, "wb") as f:
                    shutil.copyfileobj(file.file, f)
                
                sample_file = genai.upload_file(path=file_location, display_name=file.filename)
                response = model.generate_content([sample_file, userPrompt])
                
                # Encode image to base64 and store in chat history
                image_base64 = encode_file_to_base64(file)
                chat_history.append({"role": "user", "parts": {"text": userPrompt, "image": image_base64}})
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {file_extension}. Supported types: pdf, txt, docx, images (jpg, jpeg, png, bmp, gif).")
    else:
        chat = model.start_chat(history=[])
        
        response = chat.send_message(userPrompt)
        chat_history.append({"role": "user", "parts": userPrompt})
        
    chat_history.append({"role": "model", "parts": response.text})
    db.Users.update_one(
        {"username": username},
        {"$set": {"chatHistory": chat_history}},
        upsert=True
    )

    
    return JSONResponse(content={"response": response.text})


@app.post("/summarizer")
async def generate_summary(noteKey: str = Form(None), username: str = Form(None), file: UploadFile = File(None)):
    """
    Generate a summary for a note or uploaded PDF.
    
    Args:
        noteKey (str): Unique key for the note (optional).
        username (str): Username associated with the note (optional).
        file (UploadFile): PDF file to process (optional).
    
    Returns:
        JSON response containing the summary.
    """
    if not file and not (noteKey and username):
        raise HTTPException(status_code=400, detail="No PDF uploaded and no noteKey/username provided.")
    
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.7, top_p=0.85, google_api_key=api_key)
    
    llm_prompt = summ_prompts()
    

    content = ""

    if file:
        
        # Process the uploaded PDF file
        with tempfile.TemporaryDirectory() as tmpdirname:
            file_location = os.path.join(tmpdirname, file.filename)
            with open(file_location, "wb") as f:
                shutil.copyfileobj(file.file, f)
            
            # Load and extract text from the PDF
            loader = PyPDFLoader(file_location)
            docs = loader.load()
            content = "\n\n".join([doc.page_content for doc in docs])
    
    elif noteKey and username:
        
        # Retrieve note from MongoDB using username and noteKey
        user = db.Users.find_one({"username": username}, {"notes": 1})
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        note = next((note for note in user.get("notes", []) if note["noteKey"] == noteKey), None)
        
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        
        content = note.get("noteText", "")

    # Prepare the content for summarization
    if not content:
        raise HTTPException(status_code=400, detail="No content found to summarize.")
    
    # Chain to generate summary
    stuff_chain = (
        {"text": lambda _: content}
        | llm_prompt         # Prompt for Gemini
        | llm                # Gemini function
        | StrOutputParser()  # Output parser
    )

    try:
        
        response = stuff_chain.invoke({})
        
        return {"Summary": response}
    except Exception as e:
        
        raise HTTPException(status_code=500, detail=f"Error during summarization: {str(e)}")


@app.post('/chat')
async def chat(userPrompt: ChatSchema):
    """
    Handles chat prompts, deadlines, YouTube resource recommendations, and roadmaps using MongoDB.
    """
    user = db.Users.find_one({"username": userPrompt.username}, {"todos": 1, "chatHistory": 1})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    chat_history = user.get("chatHistory", [])
    model = genai.GenerativeModel("gemini-2.0-flash")
    chat = model.start_chat(history=chat_history)
    
    if "/manage my deadlines" in userPrompt.question.lower():
        task_dict = {}
        
        for task in user.get("todos", []):

            if not task.get("isCompleted", True):
                due = datetime.strptime(task["dueDate"], "%d-%m-%Y")
                task_dict[task["taskName"]] = [task["taskDescription"], due, task["taskType"], task["taskColor"]]
        today = date.today()
        prompt = generate_deadline_management_prompt(today, task_dict)
        response = chat.send_message(prompt)
    
    elif "/roadmap" in userPrompt.question.lower():
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192 * 2,
            "response_schema": content.Schema(
                type=content.Type.ARRAY,
                items=content.Schema(
                    type=content.Type.OBJECT,
                    enum=[],
                    required=["taskName", "taskDescription", "dueDate"],
                    properties={
                        "taskName": content.Schema(type=content.Type.STRING),
                        "taskDescription": content.Schema(type=content.Type.STRING),
                        "dueDate": content.Schema(type=content.Type.STRING),
                    },
                ),
            ),
            "response_mime_type": "application/json",
        }

        domain = extract_domain(userPrompt.question)
        today = date.today().strftime("%d-%m-%Y")
        prompt = roadmap_prompt(domain, today)
        response = chat.send_message(prompt, generation_config=generation_config)
        
        roadmap_tasks = json.loads(response.text)
        color, found = roadmap_tasktype_color_extractor(db, userPrompt.username)
        
        for task in roadmap_tasks:
            task.update({
                "taskType": "Roadmap", "taskColor": color, "isCompleted": False, "taskKey": str(uuid.uuid4())
            })
            db.Users.update_one({"username": userPrompt.username}, {"$push": {"roadmap": task}})
        
        if not found:
            new_task_type = {
                "taskTypeName": "Roadmap",
                "taskTypeColor": color,
                "taskTypeKey": str(uuid.uuid4())
            }
            db.Users.update_one({"username": userPrompt.username}, {"$addToSet": {"taskTypes": new_task_type}})
        
        if roadmap_tasks:
            first_task = roadmap_tasks[0]
            db.Users.update_one({"username": userPrompt.username}, {
                "$push": {"todos": first_task}, "$pull": {"roadmap": {"taskKey": first_task["taskKey"]}}
            })
            response_payload = {
                "response": "Roadmap created successfully!",
                "task": first_task,
                "found": found
            }
    
            if not found:
                response_payload["taskType"] = new_task_type
    
            return response_payload
    
    else:
        prompt=chatbot_default_prompt(userPrompt.question)
        response = chat.send_message(prompt)


    return {"response": response.text}


@app.post('/make-it-litt')
async def make_it_litt(note: LittNoteSchema):
    full_note = "Note Title:" + note.noteTitle+"\n Note Text: "+note.noteText
    
    query = extract_keywords_from_text(full_note)
    gif_link = await get_gif_src(query)

    prompt = make_it_litt_prompt(full_note,gif_link)
    
    # Generate the response using Gemini API
    model = genai.GenerativeModel(model_name='gemini-2.0-flash')
    response = model.generate_content(
        prompt,
        generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "response_schema": content.Schema(
        type=content.Type.OBJECT,
        required=["title", "content"],
        properties={
            "title": content.Schema(type=content.Type.STRING),
            "content": content.Schema(type=content.Type.STRING),
        },
    ),
    "response_mime_type": "application/json",
}

    )
    return json.loads(response.text)



if __name__ == "__main__":
    uvicorn.run("app:app", reload=True, port=8000, host="0.0.0.0")
