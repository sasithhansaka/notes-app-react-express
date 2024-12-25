import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashbord' element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
