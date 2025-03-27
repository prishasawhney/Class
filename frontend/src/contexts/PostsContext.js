import React, { createContext, useContext, useState, useEffect } from "react";
// import { readPosts, createPost, like_unlike } from "../../API/community.api"; // Uncomment when API is ready

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // Function to fetch posts (Mock API call)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // const postsData = await readPosts();
                const postsData = [
                    {
                        "postKey": "1",
                        "postCreatedBy": "JohnDoe",
                        "postCreatedOn": "2025-03-27T14:30:00Z",
                        "postDescription": "This is my first post! **Excited to be here.**",
                        "postLikesCount": 12,
                        "likedByUsers": ["JaneDoe", "AlexSmith"],
                        "comments": [
                            {
                                "commentPostKey": "1",
                                "commentKey": "101",
                                "commentCreatedBy": "JaneDoe",
                                "commentDescription": "Welcome to the platform! 🎉",
                                "commentUpvotes": 3,
                                "commentDownvotes": 0
                            },
                            {
                                "commentPostKey": "1",
                                "commentKey": "102",
                                "commentCreatedBy": "AlexSmith",
                                "commentDescription": "Looking forward to your posts!",
                                "commentUpvotes": 1,
                                "commentDownvotes": 0
                            }
                        ]
                    },
                    {
                        "postKey": "2",
                        "postCreatedBy": "JaneDoe",
                        "postCreatedOn": "2025-03-26T10:15:00Z",
                        "postDescription": "Just finished working on my new **React project**! 🚀",
                        "postLikesCount": 20,
                        "likedByUsers": ["JohnDoe", "AlexSmith", "EmilyW"],
                        "comments": [
                            {
                                "commentPostKey": "2",
                                "commentKey": "201",
                                "commentCreatedBy": "JohnDoe",
                                "commentDescription": "That sounds awesome! Can't wait to see it.",
                                "commentUpvotes": 5,
                                "commentDownvotes": 0
                            }
                        ]
                    },
                    {
                        "postKey": "3",
                        "postCreatedBy": "AlexSmith",
                        "postCreatedOn": "2025-03-25T08:45:00Z",
                        "postDescription": "Anyone else trying out **Next.js**? It's amazing! 🤩",
                        "postLikesCount": 15,
                        "likedByUsers": ["JaneDoe", "EmilyW"],
                        "comments": []
                    }
                ]

                setPosts(sortPostsByDate(postsData));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    // Function to sort posts by date
    const sortPostsByDate = (posts) => {
        return posts.sort((a, b) => new Date(b.postCreatedOn) - new Date(a.postCreatedOn));
    };

    // Function to add a new post
    const handleNewPost = async (newPost) => {
        // const response = await createPost(newPost);
        // newPost.postKey = response.message;
        setPosts(sortPostsByDate([...posts, newPost]));
    };

    // Function to like/unlike a post
    const handleLikeToggle = async (postId, isAdding) => {
        setPosts(posts.map(post =>
            post.postKey === postId
                ? { ...post, postLikesCount: isAdding ? post.postLikesCount + 1 : Math.max(post.postLikesCount - 1, 0) }
                : post
        ));
        // const response = await like_unlike({ postKey: postId, username: username });
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
