import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import Profile from "./pages/Profile"

const App = () => {
  return (
    <div className="text-white bg-[url('./src/assets/bgimg.png')] bg-gray-700 object-contain">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </div>
  )
}

export default App;