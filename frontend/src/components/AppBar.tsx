import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import {jwtDecode }from "jwt-decode"; 
import { useUser } from "../hooks";

export const AppBar = () => {
    const token = localStorage.getItem("token");
    const userid = token ? jwtDecode(token) : null; 
    //@ts-ignore
    const id = userid?.id || null; 

    const { loading, user } = useUser({ id });

    const name = user ? user.name : "Anonymous";

    return (
        <div className="border-b shadow-sm flex justify-between items-center px-10 py-4 bg-white">
            <Link to="/blogs" className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                i-Blogger
            </Link>
            <div className="flex items-center space-x-4">
                <Link to="/create">
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none 
                    focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 
                    text-center mr-4 transition-all ease-in-out duration-150">
                        Create
                    </button>
                </Link>
                <div className="flex items-center">
                    <Link to="/my-blogs" className="flex items-center space-x-2">
                        <Avatar size="big" name={loading ? "Anonymous" : name} />
                        <span className="text-gray-800 hover:text-gray-600 text-sm font-medium transition-colors">
                            My Profile
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
