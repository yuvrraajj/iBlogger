import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    
    if (loading) {
        return <div>
            <AppBar/> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div> 
        <AppBar/>
    <div className="flex justify-center">
    <div className="">
        {blogs.map(blog=><BlogCard 
    id={blog.id}
    authorName={blog.author.name||"Anonymous"} 
    title={blog.title} 
    date={"10 Sep 2024"} 
    content={blog.content} 
/>)}
</div>
    </div>
    </div>
} 
