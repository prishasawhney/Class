import React, { useState, useEffect } from 'react';
import "boxicons";
import "./CommunityPage.css";
import DisplayCard from "./DisplayCard";
import Post from "./Post";
import AddNewPost from "./NewPost"; 
import { usePosts } from "../../contexts/PostsContext";
// import { createPost, readPosts, readComments, like_unlike } from "../../API/community.api";

const CommunityPage = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [postquery, setPostQuery] = useState('');
  const [query, setQuery]=useState('');
  const [glasseffect, setglasseffect] = useState(false);
  const [addNewpost, setAddNewpost] = useState(false);
  const { posts, handleNewPost} = usePosts();

  // const sortPostsByDate = (posts) => {
  //   return posts.sort((a, b) => new Date(b.postCreatedOn) - new Date(a.postCreatedOn));
  // };

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        // const postsData = await readPosts();
        // setPosts(sortPostsByDate(postsData)); 

        // const commentsData = await readComments();
        // setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPostsAndComments();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addNewPost = () => {
    setglasseffect(true);
    setAddNewpost(true);
  };

  // const handleLikeToggle = async (postId, isAdding) => {
  //   setPosts(posts.map(post =>
  //     post.postKey === postId
  //       ? { ...post, postLikesCount: isAdding ? post.postLikesCount + 1 : Math.max(post.postLikesCount - 1, 0) }
  //       : post
  //   ));
  //   const like = { postKey: postId, username: username };
  //   // const response = await like_unlike(like);
  // };

  // const handleNewPost = async (newPost) => {
  //   // const response = await createPost(newPost);
  //   // newPost.postKey = response.message;
  //   const updatedPosts = [...posts, newPost];
  //   setPosts(sortPostsByDate(updatedPosts)); // Sort the posts after adding a new one
  // };

  const filteredPosts = posts.filter((post) =>
    (post.postDescription?.toLowerCase() || "").includes(postquery.toLowerCase())
  );

  return (
    <>
      {glasseffect && (<div id="glasseffect"></div>)}
      {addNewpost && (<AddNewPost setAddNewpost={setAddNewpost} setglasseffect={setglasseffect} handleNewPost={handleNewPost} posts={posts} username={username} />)}
      <div id="pageOuter">
        <div id="interactionPageMain">
          <div id="pageTopBar">
            <div id="pageSearchBar">
              <box-icon name='search' color='#aaaa'></box-icon>
              <input type="text" placeholder="Search Anything...." value={postquery}
                onChange={(e) => setPostQuery(e.target.value)} />
            </div>
            <button className="Btn" onClick={addNewPost}>
              <div className="sign">+</div>
              <div className="text">Create</div>
            </button>
          </div>
          <div id="pagePosts">
            {filteredPosts.map((post) => (
              <Post
                key={post.postKey}
                post={post}
                setComments={setComments}
                username={username}
              />
            ))}

          </div>
        </div>
        <div id="pageSidePanel">
          <form onSubmit={handleSubmit}>
            <div id="searchBar" style={{ width: "95%" }}>
              <box-icon name='search' color='#aaaa'></box-icon>
              <input
                type="text"
                placeholder="Search Anything...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
          <DisplayCard />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;