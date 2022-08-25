import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <div>
                <img src='/logo-small.png' />
            </div>
            <div onClick={() => {
                window.open('https://github.com/VladNagibin/Choose', '_blank');
            }}>
                Github
            </div>
            <div>
                API
            </div>
            <Link to='/docs/main'>
            <div>
                Справка
            </div>
            </Link>
        </div>
    )
}
