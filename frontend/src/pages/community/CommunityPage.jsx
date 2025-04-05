import React, { useState, useEffect } from 'react';
import "boxicons";
import "./CommunityPage.css";
import DisplayCard from "./DisplayCard";
import Post from "./Post";
import AddNewPost from "./NewPost";
import { usePosts } from "../../contexts/PostsContext";
import { useComments } from "../../contexts/CommentsContext";
import { ComboBox, Option } from "@salt-ds/core";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css"; 

// import { createPost, readPosts, readComments, like_unlike } from "../../API/community.api";

const CommunityPage = ({ username }) => {
  const [postquery, setPostQuery] = useState('');
  const [query, setQuery] = useState('');
  const [glasseffect, setglasseffect] = useState(false);
  const [addNewpost, setAddNewpost] = useState(false);
  const { posts, handleNewPost, handleLikeToggle } = usePosts();
  const shortColorData = ['politics', 'science', 'sports', 'business', 'stock market'];

  // const sortPostsByDate = (posts) => {
  //   return posts.sort((a, b) => new Date(b.postCreatedOn) - new Date(a.postCreatedOn));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addNewPost = () => {
    setglasseffect(true);
    setAddNewpost(true);
  };

  const filteredPosts = posts.filter((post) =>
    (post.postDescription?.toLowerCase() || "").includes(postquery.toLowerCase())
  );

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const handleSelectionChange = () => {
    setValue("");
  };


  return (
    <>
      {glasseffect && (<div id="glasseffect"></div>)}
      
      {addNewpost && (<AddNewPost setAddNewpost={setAddNewpost} setglasseffect={setglasseffect} />)}
      <div id="pageOuter" className='salt-theme'>
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
                post={post}
                username={username}
              />
            ))}

          </div>
        </div>
        <div id="gradientLine"></div>
        <div id="pageSidePanel">
          <form onSubmit={handleSubmit} style={{ height: "fitContent", width: "100%", display: "flex", justifyContent: "center" }}>
            <SaltProvider>
              <ComboBox
                onChange={handleChange}
                onSelectionChange={handleSelectionChange}
                value={value}
                multiselect
                truncate
                defaultSelected={shortColorData}
                style={{ width: "90%" }}
              >
                {shortColorData
                  .filter((color) =>
                    color.toLowerCase().includes(value.trim().toLowerCase()),
                  )
                  .map((color) => (
                    <Option value={color} key={color} />
                  ))}
              </ComboBox>
            </SaltProvider>
          </form>
          <DisplayCard />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;