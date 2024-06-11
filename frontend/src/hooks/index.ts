import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    
        "content": string
        "title": string
        "id": string
        "author": {
          "name": string
        }  
      
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        }).then(async response => {
                console.log(response);
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error=>{
                console.error("Error fetching blogs:", error);
            })             
    },[]);

    return {
        
        loading,
        blogs

    }
}
export const useBlog=({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        }).then(async response => {
                console.log(response);
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error=>{
                console.error("Error fetching blogs:", error);
            })             
    },[id]);

    return {        
        loading,
        blog
    }
}