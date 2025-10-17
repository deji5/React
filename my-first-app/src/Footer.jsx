import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
        <p>{year} Naija Tech Hub. All right reserved.</p>
    </footer>
  )
}

export default Footer