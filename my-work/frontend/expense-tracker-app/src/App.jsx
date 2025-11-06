import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup></Signup>} />
      <Route path='/Login' element={<Login></Login>} />
      <Route path='/Dashboard' element={<Dashboard></Dashboard>}/>
    </Routes>
  )
}

export default App
