import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { Hono } from "hono"
import { sign, verify } from 'hono/jwt'


const app = new Hono()
app.use('/api/v1/blog/*', async (c, next) => {
  await next()
  const header=c.req.header("authorization")|| "";
  const token=header.split(" ")[1]; 
 
  //@ts-ignore
  const response=await verify(header,c.env.JWT_SECRET);
  if(response.id) next();
  else {
    c.status(403)
    return c.json({error:"unauthorized"});
  }
})

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
    //@ts-ignore
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    // @ts-ignore
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	
})
app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
    //@ts-ignore
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
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
 //@ts-ignore
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})
app.post('/api/v1/blog',(c) => {
  return c.text("hi");
})
app.put('/api/v1/blog',(c) => {
  return c.text("hi");
})
app.get('api/v1/blog/:id',(c) => {
return c.text("");
})
export default app