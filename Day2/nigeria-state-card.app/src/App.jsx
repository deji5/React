import React from "react"
import StateCard from "./StateCard"

function App() {
  return (
    <div>
      <StateCard 
      state="Lagos"
      capital="ikeja"
      region="West"
      population={14000000}
      isPopular={true}
      />

      <StateCard 
      state="Lagos"
      capital="ikeja"
      region="North"
      population={14000000}
      isPopular={true}
      />
    </div>
  )
}

export default App
