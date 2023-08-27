"use client"

import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {

  const [ searchText, setSearchText ] = useState('');
  const [ searchTimeout, setSearchTimeout ] = useState(null);
  const [ searchedResults, setSearchedResults ] = useState([]);
  const [ posts, setPosts ] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(()=> {
      const searchResults = filterPrompts(e.target.value);
      setSearchedResults(searchResults);
    }, 500));
  }

  useEffect(()=>{
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setSearchedResults(data)
    }
    fetchPosts();
  },[])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');

    return posts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }



  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" className="search_input peer" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required  />
      </form>

      <PromptCardList
        data = {searchedResults}
        handleTagClick={(t)=>{
          setSearchText(t);

          const searchResults = filterPrompts(t)
          setSearchedResults(searchResults);
        }}
      />
    </section>
  )
}

export default Feed