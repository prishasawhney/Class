import React, { useState, useEffect } from 'react';
import "boxicons";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./CommunityPage.css";
import Comment from './Comment';
import { usePosts } from "../../contexts/PostsContext";
import { useAuth } from '../../contexts/AuthContext';
import { useComments } from "../../contexts/CommentsContext";

const Post = ({ post }) => {
    const { username } = useAuth();
    const { comments, handleNewComment } = useComments();
    const { handleLikeToggle } = usePosts();

    const letterColors = [
        { "letter": "A", "color": "#D3C047" },
        { "letter": "B", "color": "#D99228" },
        { "letter": "C", "color": "#C67947" },
        { "letter": "D", "color": "#D94A28" },
        { "letter": "E", "color": "#D94337" },
        { "letter": "F", "color": "#CD3F66" },
        { "letter": "G", "color": "#E2597D" },
        { "letter": "H", "color": "#D36576" },
        { "letter": "I", "color": "#EDA29B" },
        { "letter": "J", "color": "#C84F8B" },
        { "letter": "K", "color": "#A659C9" },
        { "letter": "L", "color": "#822436" },
        { "letter": "M", "color": "#632838" },
        { "letter": "N", "color": "#6CD2DF" },
        { "letter": "O", "color": "#27A1C4" },
        { "letter": "P", "color": "#2F83DB" },
        { "letter": "Q", "color": "#2C44BE" },
        { "letter": "R", "color": "#27455F" },
        { "letter": "S", "color": "#57311C" },
        { "letter": "T", "color": "#121212" },
        { "letter": "U", "color": "#8ED029" },
        { "letter": "V", "color": "#2DAF27" },
        { "letter": "W", "color": "#279479" },
        { "letter": "X", "color": "#2F8347" },
        { "letter": "Y", "color": "#6B7C46" },
        { "letter": "Z", "color": "#324317" }
    ];

    function getColorByUsername(username) {
        if (!username || typeof username !== "string") {
            return null;
        }
        const firstLetter = username.charAt(0).toUpperCase();
        const letterColor = letterColors.find((item) => item.letter === firstLetter);
        return letterColor ? letterColor.color : null;
    }

    const [isLiked, setIsLiked] = useState(false);
    const [commentBox, openCommentBox] = useState(false);
    const [newComment, addNewComment] = useState('');
    const [postComments, setPostComments] = useState(comments.filter(comment => comment.commentPostKey === post.postKey));

    const firstCharacter = post.postCreatedBy.charAt(0).toUpperCase();

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        handleLikeToggle(post.postKey, username, !isLiked);
    };

    const handleCommentClick = () => {
        openCommentBox(!commentBox);
    }

    useEffect(() => {
        let matchFound = false;
        if (post.likedByUsers) {
            for (const usernames of post.likedByUsers) {
                if (usernames === username) {
                    matchFound = true;
                    break;
                }
            }
        }
        setIsLiked(matchFound);
    }, []);
    

    useEffect(() => {
        const filteredComments = comments.filter(comment => comment.commentPostKey === post.postKey);
        setPostComments(filteredComments);
    }, [comments, post.postKey]);
    

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const comment = {
                commentDescription: newComment,
                commentCreatedBy: username,
                commentPostKey: post.postKey, 
                commentUpvotes: 0,
                commentDownvotes: 0,
                upvotedByUsers: [],
                downVotedByUsers: []
            };
            handleNewComment(comment);
            addNewComment("");
        }
    };
    
    

    const handleInputChange = (event) => {
        addNewComment(event.target.value);
    };

    const formatTimestamp = (timestamp) => {
        const postDate = new Date(timestamp);
        const now = new Date();

        const diffTime = Math.abs(now - postDate);
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffHours < 1) {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            if (now.getDate() === postDate.getDate()) {
                return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            } else {
                return 'Yesterday';
            }
        } else {
            return postDate.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
            });
        }
    };

    return (
        <div id="post">
            <div id="useid">
                <div id="userProfilePic" style={{ background: getColorByUsername(post.postCreatedBy), color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    {firstCharacter}
                </div>
                {post.postCreatedBy}
            </div>
            <div id="timestamp">{formatTimestamp(post.postCreatedOn)}</div>
            <div id="postMessage">
                <ReactMarkdown
                    children={post.postDescription}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={docco}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        img({ node, ...props }) {
                            return (
                                <img
                                    style={{ maxWidth: "100%", maxHeight: "400px" }}
                                    {...props}
                                />
                            );
                        },
                    }}
                />
            </div>
            <div id="postBottom">
                <div id="like" onClick={handleLikeClick}>
                    {isLiked ? (
                        <box-icon name='heart' type='solid' color='red'></box-icon>
                    ) : (
                        <box-icon name='heart' type='regular' color='grey'></box-icon>
                    )}
                    <span>{post.postLikesCount}</span>
                </div>
                <div id="comment" onClick={handleCommentClick}>
                    <box-icon name='chat' color='grey' onClick={handleCommentClick}></box-icon>
                    <span>{postComments.length}</span>
                </div>
            </div>
            {commentBox && (
                <div id="commentBox">
                    <div id="prevComments">
                        {postComments
                            .sort((a, b) => b.upvotes - a.upvotes)
                            .map((comment, index) => (
                                <Comment
                                    key={index}
                                    comment={comment}
                                    getColorByUsername={getColorByUsername}
                                    username={username}
                                />
                            ))
                        }
                    </div>
                    <form onSubmit={handleCommentSubmit}>
                        <div id="addComment">
                            <input
                                type="text"
                                placeholder="Post a comment.."
                                value={newComment}
                                onChange={handleInputChange}
                            />
                            <button type="submit">
                                <box-icon name='send' type='solid' ></box-icon>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Post;