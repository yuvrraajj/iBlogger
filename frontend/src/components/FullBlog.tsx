import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"


export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="flex justify-center bg-gray-50">
            <div className="grid grid-cols-12 gap-4 px-10 pt-12 pb-8 w-full max-w-screen-xl">
                <div className="col-span-12 md:col-span-9">
                    <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
                    <p className="text-gray-500 pt-2">Posted on 2 December 2023</p>
                    <article className="mt-4 text-gray-700 text-lg leading-relaxed">{blog.content}</article>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <div className="sticky top-20">
                        <h3 className="text-gray-500 text-xl">Author</h3>
                        <div className="flex mt-4">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div className="">
                                <h4 className="text-2xl font-semibold text-gray-800">{blog.author.name || "Anonymous"}</h4>
                                <p className="text-gray-500 mt-1">Random Catch Phrase or Information about the User</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
}
