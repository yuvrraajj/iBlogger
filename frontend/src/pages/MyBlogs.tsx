import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/Skeleton";
import { useMyBlogs } from "../hooks";

export const MyBlogs = () => {
    const { loading, blogs } = useMyBlogs();

    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex flex-col items-center mt-10">
                    <h1 className="text-3xl font-bold text-center mb-5">Loading your Blogs...</h1>
                    <div className="space-y-4">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }
    if (blogs.length === 0) {
        return (
            <div>
                <AppBar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-xl font-medium text-slate-600 text-center">
                        <p>You haven't posted any blogs yet.</p>
                        <Link to="/create" className="text-blue-600 hover:text-blue-800 font-semibold">
                            Click here to create a blog
                        </Link></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>
                <div className="w-full max-w-4xl space-y-4">
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            date={"10 Sep 2024"}  // Ideally, format this date dynamically based on actual data
                            content={blog.content}
                            owner={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
