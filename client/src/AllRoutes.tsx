import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup';
import ChatPage from './pages/chat/ChatPage';
import { useContext} from 'react';
import { authUser } from './AuthUserContext';
export default function AllRoutes() {
  const isAuth = useContext(authUser);
  return (
    <Router>
      <Routes>
        {!isAuth?.user_data?
          <Route path='/' element={<AuthPage />}>
            <Route path='signup' element={<Signup />} />
            <Route index element={<Login />} />
          </Route>
          :
          
            <Route path='/' element={<ChatPage />} />
        }
        <Route path='*' element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  )
}
