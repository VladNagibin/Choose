import React from 'react'
import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideInRight } from 'react-animations';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const openAnimation = keyframes`${slideInLeft}`;

const OpenDivLeft = styled.div`
  animation: 1s ${openAnimation};
`;
const openAnimationRight = keyframes`${slideInRight}`;

const OpenDivRight = styled.div`
  animation: 1s ${openAnimationRight};
`;
export default function MainPage() {
  const { t } = useTranslation();

  return (
    <div className='main-page'>
      <OpenDivLeft className='main-banner'>
        <h1>{t("main-page.main-banner.h1")}</h1>
        <img src='./table.png' />
        <h2>{t("main-page.main-banner.h2")}</h2>
      </OpenDivLeft>
      <OpenDivRight className='how-to'>
        <h1>{t("main-page.how-to.h1")}</h1>
        <div className='how-to-banners'>
          <img src={t("pictures-folder")+'/how-to-1.png'} />
          <img src={t("pictures-folder")+'/how-to-2.png'} />
          <img src={t("pictures-folder")+'/how-to-3.png'} />
        </div>
        <div className='buttons'>
        <Link to='/docs/main' className='new-table'>
          <div className='new-table-href'>
          {t("main-page.buttons.docs")}
          </div>
        </Link>
        <Link to='/table' className='new-table'>
          <div className='new-table-href'>
          {t("main-page.buttons.table")}
          </div>
        </Link>
        </div>
        
      </OpenDivRight>
      <OpenDivLeft>
        <h1>{t("main-page.safety.h1")}</h1>
        <div className='safety'>
          <img src={t("pictures-folder")+'/data.png'} />
          <img src={t("pictures-folder")+'/hash.png'} />
          <img src={t("pictures-folder")+'/open-source.png'} className='open-source' onClick={() => {
            window.open('https://github.com/VladNagibin/Choose', '_blank');
          }} />
        </div>
      </OpenDivLeft>

    </div>
  )
}
