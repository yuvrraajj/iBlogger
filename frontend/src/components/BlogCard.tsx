import axios from "axios"
import{ useNavigate} from "react-router-dom"
import { BACKEND_URL } from "../config"
interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    date:string
    id:string
    owner?:boolean
}
 // Ensure you import or define Avatar appropriately

export const BlogCard = ({ id, authorName, title, content, date, owner }: BlogCardProps) => {
    const navigate = useNavigate();

    const handleDelete = async (event:React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent event from bubbling up to the link

        if (confirm('Are you sure you want to delete this blog post?')) {
            try {
                const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}` 
                    }
                });

                if (response) {
                    console.log('Blog post deleted successfully');
                    alert('Successfully deleted blog.');
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete the blog post');
                }
            } catch (error) {
                console.error('Error deleting blog post:', error);
                alert('Error deleting blog post. Please try again.');
            }
        }
    };

    return (
        <div onClick={() => navigate(`/blog/${id}`)} className="relative block w-screen max-w-screen-md border-b pb-4 pt-4 px-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
                <Avatar name={authorName} size="small" />
                <div className="text-sm text-gray-800">{authorName}</div>
                <div className="text-xs text-gray-500">&#9679;</div>
                <div className="text-xs text-gray-500">{date}</div>
            </div>
            <h3 className="font-semibold text-lg mt-2">{title}</h3>
            <p className="text-md text-gray-700 mt-1">{content.slice(0, 100) + "..."}</p>
            <p className="text-gray-500 text-sm mt-1">{`${Math.ceil(content.length / 100)} min read`}</p>
            {owner && (
                <button onClick={handleDelete} type="button" className="absolute right-4 top-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete
                </button>
            )}
        </div>
    );
};




export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium text-white`}>
                {(name=="Anonymous")?null:name[0].toUpperCase()}
            </span>
        </div>
    );
}
