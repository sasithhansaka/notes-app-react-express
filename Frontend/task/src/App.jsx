import './App.css'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Profile from './Pages/Profile'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'

function App() {
  
  return (
    <Router>
      <Routes>
      <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/dashboard' element={<Home/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
