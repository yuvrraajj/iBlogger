import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { MyBlogs } from './pages/MyBlogs'
import { useAuth } from './hooks'
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
          <Route path="/my-blogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>     
    </>
  )
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // User not authenticated, redirect to sign-in page
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
export default App

