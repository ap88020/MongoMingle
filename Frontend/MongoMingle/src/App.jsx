import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import HomePage from './pages/Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App