import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput,updateBlogInput } from "iblogger-common";

export const blogRouter=new Hono<
{
    Bindings: {
    DATABASE_URL: string; 
    JWT_SECRET: string;
    }, 
    Variables:{
    userId:string;
 }
}>();
blogRouter.use('/*',async (c,next)=>{
    const authheader=c.req.header("authorization")||"";
    // extract user id and pass/
    const user=await verify(authheader,c.env.JWT_SECRET);
    try{
    if(user){
        c.set("userId",user.id);
        await next();
    }
    else {
        c.status(403);
        return c.json({
            message:"You are not logged in" 
        })
    }
}
catch (e){
    c.status(403);
        return c.json({
            message:"You are not logged in" 
        })
}
})
blogRouter.post('/',async (c) => {
    const body=await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            error:"Incorrect input"
        })

    }
    const userId=c.get("userId");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    
    const blog=await prisma.post.create({
        data:{
            title:body.title,       
            content:body.content,
            authorId:userId,
        }
    })
    return c.json({
        id:blog.id
    })
})
  
blogRouter.put('/',async (c) => {
    const userId=c.get("userId");
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            error:"Incorrect input"
        })

    }
const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,       
            content:body.content,
            authorId:userId,
        }
    })
    return c.json({
        id:blog.id
    })
})
blogRouter.get('/bulk',async (c)=>{
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    const blog=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }            
        }
    });
    return c.json({blog});
})
     
blogRouter.get('/:id',async (c) => {
    const id=c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    
try{
    const blog=await prisma.post.findFirst({
        where:{
            id:id
        },
    })
    
    return c.json({
        blog
    })
}
catch (e){
    return c.json({
        error:"Error while fetching blogs"
    })
}
}
)
