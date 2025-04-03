import React, { useState, useEffect } from 'react';
import "boxicons";
import "./CommunityPage.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { usePosts } from "../../contexts/PostsContext";
// import { commentUpvote, commentDownvote } from '../../API/community.api';

const Comment = ({ key, comment, getColorByUsername, username }) => {
    const { comments, setComments } = usePosts();
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownVoted, setIsDownvoted] = useState(false);
    const firstCharacter = comment.commentCreatedBy.charAt(0).toUpperCase();

    useEffect(() => {
        setIsUpvoted(Array.isArray(comment.upvotedByUsers) && comment.upvotedByUsers.includes(username));
        setIsDownvoted(Array.isArray(comment.downvotedByUsers) && comment.downvotedByUsers.includes(username));
    }, [comment.upvotedByUsers, comment.downvotedByUsers, username]);
    

    const updateCommentVotes = (commentKey, newUpvotes, newDownvotes, upvotedUsers, downvotedUsers) => {
        const updatedComments = comments.map(c =>
            c.commentKey === commentKey
                ? { ...c, commentUpvotes: newUpvotes, commentDownvotes: newDownvotes, upvotedByUsers: upvotedUsers, downvotedByUsers: downvotedUsers }
                : c
        );
        setComments(updatedComments);
    };

    const handleUpvote = () => {
        let newUpvotes = comment.commentUpvotes;
        let newDownvotes = comment.commentDownvotes;
        let updatedUpvotedUsers = [...(comment.upvotedByUsers || [])];
        let updatedDownvotedUsers = [...(comment.downvotedByUsers || [])];

        if (isUpvoted) {
            newUpvotes -= 1;
            updatedUpvotedUsers = updatedUpvotedUsers.filter(user => user !== username);
        } else {
            newUpvotes += 1;
            updatedUpvotedUsers.push(username);
            if (isDownVoted) {
                newDownvotes -= 1;
                updatedDownvotedUsers = updatedDownvotedUsers.filter(user => user !== username);
            }
        }

        setIsUpvoted(!isUpvoted);
        setIsDownvoted(false);
        updateCommentVotes(comment.commentKey, newUpvotes, newDownvotes, updatedUpvotedUsers, updatedDownvotedUsers);
    };

    const handleDownvote = () => {
        let newUpvotes = comment.commentUpvotes;
        let newDownvotes = comment.commentDownvotes;
        let updatedUpvotedUsers = [...(comment.upvotedByUsers || [])];
    let updatedDownvotedUsers = [...(comment.downvotedByUsers || [])];

        if (isDownVoted) {
            newDownvotes -= 1;
            updatedDownvotedUsers = updatedDownvotedUsers.filter(user => user !== username);
        } else {
            newDownvotes += 1;
            updatedDownvotedUsers.push(username);
            if (isUpvoted) {
                newUpvotes -= 1;
                updatedUpvotedUsers = updatedUpvotedUsers.filter(user => user !== username);
            }
        }

        setIsDownvoted(!isDownVoted);
        setIsUpvoted(false);
        updateCommentVotes(comment.commentKey, newUpvotes, newDownvotes, updatedUpvotedUsers, updatedDownvotedUsers);
    };


    return (
        <li id="commentContainer" key={comment.commentKey}>
            <div id="singleComment">
                <div id="userComment">
                    <div style={{ background: getColorByUsername(comment.commentCreatedBy), color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{firstCharacter}</div>
                    <span>{comment.commentCreatedBy}</span>
                </div>
                <div id="commentText">
                    <span><ReactMarkdown
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
                    /></span></div>
            </div>
            <div id="updownCount">
                <div id="upvoteButton" onClick={handleUpvote}><box-icon type='solid' name='up-arrow-circle' color={isUpvoted ? 'green' : 'grey'}></box-icon> {comment.commentUpvotes}</div>
                <div id="downvoteButton" onClick={handleDownvote}><box-icon type='solid' name='down-arrow-circle' color={isDownVoted ? 'red' : 'grey'}></box-icon> {comment.commentDownvotes}</div>
            </div>
        </li>
    )
};

export default Comment; 