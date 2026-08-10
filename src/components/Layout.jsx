import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
    return (
        <>
            <Navbar />
            <main className='pt-20'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout