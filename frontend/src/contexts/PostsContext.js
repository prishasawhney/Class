import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
// import { readPosts, createPost, like_unlike } from "../../API/community.api"; // Uncomment when API is ready

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            "_id": "6790e8939fbb8d1e8bb6e4f0",
            "postDescription": "# Need Help with Data Science Course\n\nHi everyone,\n\nI’m currently working on a Data Science course and struggling with understanding feature engineering. Any resources or advice would be greatly appreciated!",
            "postCreatedBy": "Prisha",
            "postCreatedOn": "2025-01-22T12:46:10.781Z",
            "postLikesCount": 3,
            "likedByUsers": ["Ikjot Singh", "Chahat", "Prisha"],
            "postKey": "6790e8939fbb8d1e8bb6e4f0"
        },
        {
            "_id": "6790e9649fbb8d1e8bb6e4f2",
            "postDescription": "# Best Tools for ML Projects\n\nWhat are the best tools for working on machine learning projects? I’m looking for recommendations on frameworks, IDEs, and cloud platforms.",
            "postCreatedBy": "Ikjot Singh",
            "postCreatedOn": "2025-02-05T15:30:20.501Z",
            "postLikesCount": 5,
            "likedByUsers": ["Prisha", "Chahat", "Aarav", "Neha", "Vikas"],
            "postKey": "6790e9649fbb8d1e8bb6e4f2"
        },
        {
            "_id": "6790e97a9fbb8d1e8bb6e4f3",
            "postDescription": "# React vs Angular for Web Apps\n\nWhich framework do you prefer for building web applications—React or Angular? Let’s discuss the pros and cons.",
            "postCreatedBy": "Aarav",
            "postCreatedOn": "2025-03-10T10:15:45.289Z",
            "postLikesCount": 7,
            "likedByUsers": ["Prisha", "Ikjot Singh", "Neha", "Vikas", "Sanya", "Chahat", "Rahul"],
            "postKey": "6790e97a9fbb8d1e8bb6e4f3"
        }
    ]
    );
    const [comments, setComments] = useState([
        {
            "_id": "6790ea4d9fbb8d1e8bb6e4f7",
            "commentDescription": "For a machine learning project, the best tools depend on the specific use case. If you're working with deep learning, TensorFlow and PyTorch are great choices!",
            "commentCreatedBy": "Chahat",
            "commentPostKey": "6790e8939fbb8d1e8bb6e4f0",
            "commentUpvotes": 2,
            "commentDownvotes": 0,
            "upvotedByUsers": ["Prisha", "Aarav"],
            "downvotedByUsers": [],
            "commentKey": "6790ea4d9fbb8d1e8bb6e4f7"
        },
        {
            "_id": "6790ea789fbb8d1e8bb6e4fa",
            "commentDescription": "React is much better for component reusability, and it has a larger community. But if you prefer a structured framework, Angular is a good choice.",
            "commentCreatedBy": "Neha",
            "commentPostKey": "6790e8939fbb8d1e8bb6e4f0",
            "commentUpvotes": 3,
            "commentDownvotes": 1,
            "upvotedByUsers": ["Ikjot Singh", "Aarav", "Vikas"],
            "downvotedByUsers": ["Sanya"],
            "commentKey": "6790ea789fbb8d1e8bb6e4fa"
        },
        {
            "_id": "6790ea8c9fbb8d1e8bb6e4fc",
            "commentDescription": "I found Angular better for enterprise applications with strict architecture, but React is great for faster development!",
            "commentCreatedBy": "Rahul",
            "commentPostKey": "6790e9649fbb8d1e8bb6e4f2",
            "commentUpvotes": 4,
            "commentDownvotes": 0,
            "upvotedByUsers": ["Prisha", "Ikjot Singh", "Neha", "Aarav"],
            "downvotedByUsers": [],
            "commentKey": "6790ea8c9fbb8d1e8bb6e4fc"
        }
    ]
    );

    const sortPostsByDate = (posts) => {
        return posts.sort((a, b) => new Date(b.postCreatedOn) - new Date(a.postCreatedOn));
    };

    const handleNewPost = async (newPost) => {
        // const response = await createPost(newPost);
        // newPost.postKey = response.message;
        setPosts(sortPostsByDate([...posts, newPost]));
    };

    const handleNewComment = async (newComment) => {
        setComments([...comments, newComment]);
    };


    const handleLikeToggle = async (postId, isAdding) => {
        setPosts(posts.map(post =>
            post.postKey === postId
                ? { ...post, postLikesCount: isAdding ? post.postLikesCount + 1 : Math.max(post.postLikesCount - 1, 0) }
                : post
        ));
        // const response = await like_unlike({ postKey: postId, username: username });
    };

    return (
        <PostContext.Provider value={{ posts, handleNewPost, handleLikeToggle, comments, handleNewComment, setComments }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    return useContext(PostContext);
};
