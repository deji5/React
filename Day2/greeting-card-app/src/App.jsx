import React from 'react'
import GreetingCard from './GreetingCard'

function App() {
  return (
    <>
      <GreetingCard name = {prompt("whats your name?")}
      message= "Have a great day!"
      color={prompt("whats your favourite color")}/>
    </>
  )
}

export default App
