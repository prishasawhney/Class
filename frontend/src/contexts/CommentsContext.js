import React, { createContext, useContext, useState, useEffect } from "react";
import {
  readComments,
  createComment,
  upvoteComment,
  downvoteComment,
} from "../api/comments.api"; // Adjust the path as needed

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // On mount, fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await readComments();
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  // Create a new comment
  const handleNewComment = async (newComment) => {
    try {
      const response = await createComment(newComment);
      newComment.commentKey = response.message; // Assign the returned commentKey
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Upvote a comment
  const handleUpvoteComment = async (vote) => {
    try {
      await upvoteComment(vote);
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.commentKey !== vote.commentKey) return comment;
  
          let newUpvotes = comment.commentUpvotes;
          let newDownvotes = comment.commentDownvotes;
          let upvotedUsers = comment.upvotedByUsers ? [...comment.upvotedByUsers] : [];
          let downvotedUsers = comment.downvotedByUsers ? [...comment.downvotedByUsers] : [];
  
          if (upvotedUsers.includes(vote.username)) {
            // If already upvoted, remove the vote
            upvotedUsers = upvotedUsers.filter((user) => user !== vote.username);
            newUpvotes = Math.max(newUpvotes - 1, 0);
          } else {
            // If the user was previously downvoted, remove the downvote
            if (downvotedUsers.includes(vote.username)) {
                downvotedUsers = downvotedUsers.filter((user) => user !== vote.username);
                newDownvotes = Math.max(newDownvotes - 1, 0);
              }
            // Add the upvote
            upvotedUsers.push(vote.username);
            newUpvotes += 1;
            
          }
  
          return {
            ...comment,
            commentUpvotes: newUpvotes,
            commentDownvotes: newDownvotes,
            upvotedByUsers: upvotedUsers,
            downvotedByUsers: downvotedUsers,
          };
        })
      );
    } catch (error) {
      console.error("Error upvoting comment:", error);
    }
  };
  
  // Downvote a comment
  const handleDownvoteComment = async (vote) => {
    try {
      await downvoteComment(vote);
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.commentKey !== vote.commentKey) return comment;
  
          let newUpvotes = comment.commentUpvotes;
          let newDownvotes = comment.commentDownvotes;
          let upvotedUsers = comment.upvotedByUsers ? [...comment.upvotedByUsers] : [];
          let downvotedUsers = comment.downvotedByUsers ? [...comment.downvotedByUsers] : [];
  
          if (downvotedUsers.includes(vote.username)) {
            // If already downvoted, remove the vote
            downvotedUsers = downvotedUsers.filter((user) => user !== vote.username);
            newDownvotes = Math.max(newDownvotes - 1, 0);
          } else {
            // If the user was previously upvoted, remove the upvote
            if (upvotedUsers.includes(vote.username)) {
                upvotedUsers = upvotedUsers.filter((user) => user !== vote.username);
                newUpvotes = Math.max(newUpvotes - 1, 0);
              }
            // Add the downvote
            downvotedUsers.push(vote.username);
            newDownvotes += 1;
          }
  
          return {
            ...comment,
            commentUpvotes: newUpvotes,
            commentDownvotes: newDownvotes,
            upvotedByUsers: upvotedUsers,
            downvotedByUsers: downvotedUsers,
          };
        })
      );
    } catch (error) {
      console.error("Error downvoting comment:", error);
    }
  };
  

  return (
    <CommentContext.Provider
      value={{
        comments,
        handleNewComment,
        handleUpvoteComment,
        handleDownvoteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentContext);
};
