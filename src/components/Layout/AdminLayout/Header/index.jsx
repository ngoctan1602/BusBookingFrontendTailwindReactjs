import React from 'react';
import './main.css';

export default function Header (){

    const [state, setState] = React.useState({})

    const admin = {
        name: 'Admin',
        email: 'dominhdung21082002@gmail.com',
        phoneNumber: '0123456789',
    }

    

    return (
    <div className='fixed'>
        <section className="header">
            <section className="header-top">
                <section className="header-top__logo">
                <a href="/" className="header-logo">LOGO</a>
                </section>
                <section className="header-top__navbar">
                <section className="header-top__navigation">
                    <section className="navbar">
                        <a href="/" className="navbar-item">Home</a>
                        <a href="/about" className="navbar-item">About</a>
                        <a href="/portfolio" className="navbar-item">Portfolio</a>
                        <a href="/shop" className="navbar-item">Shop</a>
                        <a href="/blog" className="navbar-item">Blog</a>
                        <a href="/contact" className="navbar-item">Contact</a>
                    </section>
                </section>
                </section>
            </section>
        </section>
    </div>
    )
}