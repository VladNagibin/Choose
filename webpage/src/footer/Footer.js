import React from 'react'

export default function Footer() {
    return (
        <div className='footer'>
            <div>
                <img src='./logo-small.png' />
            </div>
            <div onClick={() => {
            window.open('https://github.com/VladNagibin/Choose', '_blank');
          }}>
                Github
            </div>
            <div>
                API
            </div>
            <div>
                Справка
            </div>
        </div>
    )
}
