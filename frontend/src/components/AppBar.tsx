import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
export const AppBar=()=>{

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center text-xl cursor-pointer">
        i-Blogger
        </Link>
        <div className="flex justify-between">
        <Link to="/create">
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none 
        focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 
        text-center me-2 mb-2">Create</button>
        </Link>
        <div><Avatar size={"big"} name="yuvraj" /></div>        
        </div>
    </div>
}