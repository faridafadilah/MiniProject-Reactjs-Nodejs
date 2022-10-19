import React, { useState, useEffect } from 'react'
import LandingPage from './UI/Landing/LandingPage'
import Service from './UI/Service/Service'
import Team from './UI/Team/Team'
import Blog from './UI/Blog/Blog'
import Chat from './UI/Chat/Chat'
import Footer from './UI/Footer/Footer'

function Home() {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <>
      <LandingPage theme={theme} />
      <Service />
      <Team />
      <Blog />
      <Chat />
      <Footer />
    </>
  )
}

export default Home
