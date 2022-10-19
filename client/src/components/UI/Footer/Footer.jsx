import React from 'react';
import './Footer.css';

const quickLinks01 = [
    {
        path: '#',
        display: 'Marketing',
    },
    {
        path: '#',
        display: 'Developer',
    },
    {
        path: '#',
        display: 'Designer',
    }
];

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer__wrapper'>
                    <div className='footer__logo'>
                        <h2>WalkSpace</h2>
                        <p className='description'>Grow with us</p>
                        <p className='small__text description'>Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publica</p>
                    </div>
                    <div className='footer__quick-links'>
                        <h3 className='quick__links-title'>Solution</h3>
                        <ul className='quick__links'>
                            {
                                quickLinks01.map((item, index) => (
                                    <li className='quick__link-item' key={index}>
                                        <a href={item.path}>{item.display}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <p className='copyright'>
                    Copyright {year}, developed by Farida Fadilah. All right reserved.{" "} 
                </p>
            </div>
        </footer>
    )
}
export default Footer;