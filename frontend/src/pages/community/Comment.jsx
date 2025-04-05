import React, { useState, useEffect } from 'react';
import "boxicons";
import "./CommunityPage.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useAuth } from '../../contexts/AuthContext';
import { useComments } from "../../contexts/CommentsContext";

const Comment = ({ comment, getColorByUsername }) => {
    const { username } = useAuth();
    const { handleUpvoteComment, handleDownvoteComment } = useComments();
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownVoted, setIsDownvoted] = useState(false);
    const firstCharacter = comment.commentCreatedBy.charAt(0).toUpperCase();

    useEffect(() => {
        setIsUpvoted(
            Array.isArray(comment.upvotedByUsers) &&
            comment.upvotedByUsers.includes(username)
        );
        setIsDownvoted(
            Array.isArray(comment.downvotedByUsers) &&
            comment.downvotedByUsers.includes(username)
        );
    }, [comment.upvotedByUsers, comment.downvotedByUsers, username]);

    const handleUpvote = async () => {
        try {
            await handleUpvoteComment({ commentKey: comment.commentKey, username });
        } catch (error) {
            console.error("Error upvoting comment:", error);
        }
    };

    const handleDownvote = async () => {
        try {
            await handleDownvoteComment({ commentKey: comment.commentKey, username });
        } catch (error) {
            console.error("Error downvoting comment:", error);
        }
    };

    return (
        <li id="commentContainer" key={comment.commentKey}>
            <div id="singleComment">
                <div id="userComment">
                    <div
                        style={{
                            background: getColorByUsername(comment.commentCreatedBy),
                            color: 'white',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {firstCharacter}
                    </div>
                    <span>{comment.commentCreatedBy}</span>
                </div>
                <div id="commentText">
                    <span>
                        <ReactMarkdown
                            children={comment.commentDescription}
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
                    </span>
                </div>
            </div>
            <div id="updownCount">
                <div id="upvoteButton" onClick={handleUpvote}>
                    <box-icon
                        type='solid'
                        name='up-arrow-circle'
                        color={isUpvoted ? 'green' : 'grey'}
                    ></box-icon> {comment.commentUpvotes}
                </div>
                <div id="downvoteButton" onClick={handleDownvote}>
                    <box-icon
                        type='solid'
                        name='down-arrow-circle'
                        color={isDownVoted ? 'red' : 'grey'}
                    ></box-icon> {comment.commentDownvotes}
                </div>
            </div>
        </li>
    );
};

export default Comment;
