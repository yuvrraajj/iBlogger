import { Hono } from "hono";

export const blogRouter=new Hono();

blogRouter.post('/blog',(c) => {
    return c.text("hi");
  
})
  
  
blogRouter.put('/blog',(c) => {
    return c.text("hi");
})

blogRouter.get('/blog/:id',(c) => {
  return c.text("");
})