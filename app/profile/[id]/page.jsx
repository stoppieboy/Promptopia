"use client"

import { useState,useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@/components/Profile"

const OtherProfile = ({ params }) => {

    const [ userPosts, setUserPosts ] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    
    useEffect(()=>{
        const fetchPosts = async() => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
          setUserPosts(data);
        }
        if(params?.id) fetchPosts();
    },[params.id])

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personlized profile page`}
            data={userPosts}
        />
    )
}

export default OtherProfile