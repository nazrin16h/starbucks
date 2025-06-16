import React from 'react'
import Header from '../header/Header'
import MenuPage from './MenuPage'
import Footer from '../footer/Footer'

function Menu() {
    return (
        <div className='min-h-screen'>
            <Header/>
            <MenuPage/>
            <Footer/>
        </div>
    )
}

export default Menu