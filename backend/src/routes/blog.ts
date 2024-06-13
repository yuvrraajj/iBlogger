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
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    try{const blog=await prisma.post.findMany({
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
    return c.json({ blogs: blog });
}
    catch(e){
        console.log("Error aagaya");
        console.log(e);
    }    
})

blogRouter.delete('/:id', async (c) => {
    const userId = c.get("userId");  
    const id = c.req.param("id");  
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                authorId: true  
            }
        });

        
        if (!blog) {
            c.status(404);
            return c.json({ error: "Blog post not found" });
        }

        if (blog.authorId !== userId) {
            c.status(403);
            return c.json({ error: "You do not have permission to delete this blog post" });
        }

        
        await prisma.post.delete({
            where: {
                id: id
            }
        });

        return c.json({
            message: "Blog post deleted successfully"
        });
    } catch (e) {
        console.log(e);
        c.status(500);
        return c.json({
            error: "An error occurred while deleting the blog post"
        });
    }
});

blogRouter.get('/my-blogs', async (c) => {
    const userId = c.get("userId");  // Retrieve the userId stored in the context

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        // Fetch all posts where the authorId matches the userId from the context
        const userBlogs = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blogs: userBlogs
        });
    } catch (e) {
           console.log(e);
        c.status(500);
        return c.json({
            error: "An error occurred while fetching the user's blogs"
        });
    }
});
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
        select:{
            title:true,
            content:true,
            author:{
                select:{
                name:true
                }
            }
        }
    })
    
    return c.json({
        blog
    })
}
catch (e){
    return c.json({
        e,
        error:"Error while fetching blogs"
    })
}
})

