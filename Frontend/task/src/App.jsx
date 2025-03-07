import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/Profile'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'


function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Home/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
