import React from 'react'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import Ftr from './components/footer/Ftr'

function App() {
  return (
    <div className='flex flex-col gap-100'>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App