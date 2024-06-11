import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"


export const FullBlog=({blog}:{blog: Blog})=>{
    return <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10 pt-12 w-full max-w-screen-xl">
        <div className="col-span-9">
            <div className="text-3xl font-extrabold ">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 2 december 2023</div>
            <div className="">{blog.content}</div>
        </div>
        <div className="col-span-3">
           <div className="text-slate-500 text-lg">Author</div>
           <div className="flex">
            <div className="pr-2 flex flex-col justify-center">
            <Avatar size={"big"} name={blog.author.name||"Anonymous"}/>
            </div>
            <div className="">
              <div className=""></div>
              <div className="text-lg-2xl font-bold ">{blog.author.name||"Anonymous"}</div>
              <div className="text-slate-500">Random Catch Phrase or Information about the User</div>
            </div>
           </div>
        </div>
    </div>        
    </div>
}