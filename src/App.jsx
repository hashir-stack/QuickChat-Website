import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const App = () => {

  const { authUser } = useContext(AuthContext);

  return (
    <div className="text-white bg-[url('./src/assets/bgimg.png')] bg-gray-700 object-contain">
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={!authUser ?<Login/>: <Navigate to={"/"}/>}/>
        <Route path='/profile' element={authUser ?<Profile /> : <Navigate to={"/login"}/>}/>
      </Routes>
    </div>
  )
}

export default App;