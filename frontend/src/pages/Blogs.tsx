import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>Loading...</div>
    }
    return <div> 
        <AppBar/>
    <div className="flex justify-center">
    <div className="max-w-xl">
        <BlogCard 
    authorName={"Jane Doe"} 
    title={"Exploring the Future of Technology"} 
    date={"10 Sep 2024"} 
    content={"In this post, we delve into the latest advancements in AI and their potential impacts on various industries. Join us as we explore what the future may hold for technological innovation."} 
/>
<BlogCard 
    authorName={"Jane Doe"} 
    title={"Exploring the Future of Technology"} 
    date={"10 Sep 2024"} 
    content={"In this post, we delve into the latest advancements in AI and their potential impacts on various industries. Join us as we explore what the future may hold for technological innovation."} 
/>
<BlogCard 
    authorName={"Jane Doe"} 
    title={"Exploring the Future of Technology"} 
    date={"10 Sep 2024"} 
    content={"In this post, we delve into the latest advancements in AI and their potential impacts on various industries. Join us as we explore what the future may hold for technological innovation."} 
/>
<BlogCard 
    authorName={"Jane Doe"} 
    title={"Exploring the Future of Technology"} 
    date={"10 Sep 2024"} 
    content={"In this post, we delve into the latest advancements in AI and their potential impacts on various industries. Join us as we explore what the future may hold for technological innovation."} 
/>
</div>
    </div>
    </div>
} 
