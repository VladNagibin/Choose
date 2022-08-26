import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Footer() {
    const { t } = useTranslation();
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
            <div onClick={()=>toast.info('Еще в разработке)')}>
                API
            </div>
            <Link to='/docs/main'>
            <div>
                {t("documentation")}
            </div>
            </Link>
        </div>
    )
}
