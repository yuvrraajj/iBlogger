import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/create" element={<Publish/>}/>
    </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App

