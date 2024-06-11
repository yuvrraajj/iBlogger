import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";

export const Blog=()=>{
 const{id}=useParams();
 const {loading,blog}=useBlog({
    id:id||"",
});
 if(loading||!blog) return <div>
   <AppBar/>
  <div className="h-screen flex flex-col justify-center">
   <div className="flex justify-center">
      <Spinner/>
   </div>
   </div>
 </div>

 return <div>
    <AppBar/>
    <FullBlog blog={blog}/>
     </div>
}