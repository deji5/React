import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ColorPicker from './ColorPicker'
import ColorDisplay from './ColorDisplay'
import RGBSlider from './RGBSlider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ColorPicker/>
      <RGBSlider/>
      <ColorDisplay/>
    </>
  )
}

export default App
