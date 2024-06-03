import { Hono } from "hono"

const app = new Hono()

app.post('/api/v1/signup',(c) => {
  return c.text("hi");
})
app.post('/api/v1/signin',(c) => {
  return c.text("hi");
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