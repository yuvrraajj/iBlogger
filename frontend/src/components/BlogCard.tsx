interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    date:string
}
export const BlogCard=({authorName,title,content,date}:BlogCardProps)=>{
    return <div className="border-b pb-3 border-slate-300 pt-4 pl-2 p-4">
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
}
export function Avatar({name,size=6}:{name:string,size?:Number}){
return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size==6?" text-xs":"text-md"}  text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}