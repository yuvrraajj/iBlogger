import axios from "axios";
import { Signupinput } from "iblogger-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate();
    const [postinputs,setpostinputs]=useState<Signupinput>({
        name:"",
        email:"",
        password:""
    })
   async function sendReq(){
        try{
        const res= await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postinputs);
        const jwt=await res.data;
        localStorage.setItem("token",jwt.jwt);  
        navigate("/blogs");
        }
        catch (e){
           alert(`Error while ${type=="signup"?"signing up":"signing in"}`);
           console.log(e);
        } 
    }
    return <div className=" h-screen flex justify-center flex-col">  
    
    <div className="flex justify-center">
    <div className="px-10">
    <div className="text-3xl font-extrabold mt-2"> Create an Account </div>           
    <div className="text-slate-400">{type=="signup"?"Already have an account?":"Don't have an account"} <Link className="pl-3" to={type=="signup"?"/signin":"/signup"}><u>{type=="signup"?"Log in":"Sign Up"}</u></Link></div>    
    {type=="signup" ?
    <LableInput label="Username" placeholder="Enter Username" onChange={(e)=>{
        setpostinputs(c=>({
            ...c,
            name:e.target.value
        }))
    }}/>:null}
     <LableInput label="Email" placeholder="Enter Email" onChange={(e)=>{
        setpostinputs(c=>({
            ...c,
            email:e.target.value
        }))
    }}></LableInput>
     <LableInput label="Password" type={"password"} placeholder="Enter Passsword" onChange={(e)=>{
        setpostinputs(c=>({
            ...c,
            password:e.target.value
        }))
    }}></LableInput>
    <div className="flex justify-center"><button onClick={sendReq} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-6">{type=="signup"?"Sign Up":"Sign In"}</button></div>
    </div>
   
    </div>
    </div>
}
interface labelinputType {
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LableInput({label,placeholder,onChange,type}:labelinputType){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black mt-4">{label}</label>
            <input onChange={onChange} type={type||"text"}  className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>       
    </div>
}