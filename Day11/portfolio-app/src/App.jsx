import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='projects' element={<Projects/>}/>
      <Route path='skills' element={<Skills/>}/>
      <Route path='Contact' element={<Contact/>}/>
    </Routes>
  )
}

export default App
