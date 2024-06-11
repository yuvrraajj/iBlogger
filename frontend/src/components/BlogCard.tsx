import{Link} from "react-router-dom"
interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    date:string
    id:string
}
export const BlogCard=({id,authorName,title,content,date}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="w-screen max-w-screen-md border-b pb-3 border-slate-300 pt-4 pl-2 p-4 cursor-pointer">
        <div className="flex">
            <div><Avatar name={authorName}/></div>
            <div className="flex justify-center flex-col  pl-2 text-sm ">{authorName}</div>
            <div className="flex justify-center flex-col text-xs font-thin pl-2 "> &#9679;</div>

           <div className="pl-2 font-extralight text-slate-500"> {date}                    </div>
        </div>
        <div className="font-semibold text-xl pt-2">{title}</div>
        <div className="text-md font-light pt-2">{content.slice(0,100)+"..."}</div> 
        <div className="text-slate-400 text-sm font-extalight pt-2">  {`${Math.ceil(content.length/100)} minutes`} </div>
        <div className="h-1 w-full text-slate-400"></div>
    </div>
    </Link>
    
}
export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}