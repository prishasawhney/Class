import React, { createContext, useContext, useState, useEffect } from "react";
import { readPosts, createPost, toggleLikePost } from "../api/posts.api"; // Adjust the path as needed

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // On mount, fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await readPosts();
        // Sort posts by date (newest first)
        fetchedPosts.sort(
          (a, b) => new Date(b.postCreatedOn) - new Date(a.postCreatedOn)
        );
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Create a new post
  const handleNewPost = async (newPost) => {
    try {
      const response = await createPost(newPost);
      newPost.postKey = response.message; // Assign the returned postKey
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Toggle like/unlike for a post
  const handleLikeToggle = async (postKey, username, isAdding) => {
    try {
      await toggleLikePost({ postKey, username });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
            post.postKey === postKey
                ? {
                      ...post,
                      postLikesCount: isAdding
                          ? post.postLikesCount + 1
                          : Math.max(post.postLikesCount - 1, 0),
                      likedByUsers: isAdding
                          ? [...post.likedByUsers, username] // Add user to likedByUsers
                          : post.likedByUsers.filter((user) => user !== username), // Remove user from likedByUsers
                  }
                : post
        )
    );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, handleNewPost, handleLikeToggle }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};
