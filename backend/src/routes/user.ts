import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput,Signininput } from "iblogger-common";

export const userRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string
    }

}>();

userRouter.post('/signup', async(c)=>{

const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            error:"Input incorrect"
        })
    }
      
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
                name:(body.name)?body.name:null
			}
		}); 
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });

})

userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const {success}=signupInput.safeParse(body);
            if(!success){
                       c.status(403);        
                       return c.json({
                                   error:"Input incorrect"
                                        })
    }
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password:body.password
            }
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "Incorrect Credentials!" });
        }    
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
})

userRouter.get('/details/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    const userId = c.req.param("id");
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            return c.json({ error: 'User not found' });       }

        return c.json({user});
    } catch (error) {
        console.error('Error fetching user:', error);
        return c.json({ error: 'Internal server error' });
    }
});
