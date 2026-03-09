import React, { useState, useEffect, } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import './HomePage.css';
import { useTranslation } from 'react-i18next';
import PromoImage from  '../../assets/Home/TradefairPopupImg.png';
import GooglePlay from '../../assets/Home/Google Play.svg'
import AppStore from '../../assets/Home/App Store.svg'

const TradefairPopup = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
   
      
  const isHomePage =
    location.pathname === '/' ||
    /^\/(en|de|fr)(\/)?$/.test(location.pathname);

  if (!isHomePage) return;

  const hasShown = sessionStorage.getItem('tradefairPopupShown');
  if (hasShown) return;

  sessionStorage.setItem('tradefairPopupShown', 'true');

  // Show popup immediately
  setIsVisible(true);

  // Hide popup after 10 seconds
  const timer = setTimeout(() => {
  console.log('Popup should close now');
  setIsVisible(false);
}, 10000);


  

  return () => clearTimeout(timer); // cleanup
}, [location.pathname]);




const handleClose = () => {
  setIsVisible(false);
};


const handleLearnMore = () => {
    window.open('https://www.iss-gut-leipzig.de/', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <Box className="tradefair-popup-overlay">
      <Box className="tradefair-popup-container">
        <IconButton
          className="tradefair-popup-close"
          onClick={handleClose}
          data-cursor="hover"
        >
          <Close sx={{ fontSize: '20px', }} />
        </IconButton>

        <Box className="tradefair-popup-content">
          <img src={PromoImage} alt="promoImage"   style={{marginTop: '8px', marginBottom:'4px', width: '100%',height: 'auto',borderRadius: '20px',maxHeight: '260px',
           '@media (min-width: 768px)': {maxWidth: '480px',maxHeight: '260px'}}}/>
          <Typography
            variant="h3"
            className="tradefair-popup-title headings-h4"
            data-cursor="hover"
          >
            {t('tradefairPopup.title', 'Experience the Future of Gastronomy – Live at ISS GUT Leipzig')}
          </Typography>

          <Typography
            className="tradefair-popup-description bodyRegularText3"
            data-cursor="hover"
          >
            {t('tradefairPopup.description')}
          </Typography>

          <Box sx={{ 
            display: "flex",
            gap: "12px",
            mt: 3,
            flexWrap: "wrap"
            }}
          >
          
           <a href="https://apps.apple.com/de/app/naf-smarte-automaten/id6758438736" target="_blank" rel="noopener noreferrer">
          
          <Box component="img" 
          src={GooglePlay} 
          alt="Get it on Google Play"
          sx={{
            height: "40px",
            cursor: "pointer"
           }}
           />
          </a>
        
          <a href="https://play.google.com/store/apps/details?id=com.naf.naf_mobile_app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">

             <Box component="img"
             src={AppStore}
             alt="Download on App Store"
             sx={{
              height: "40px",
              cursor: "pointer"
            }}
            />
          </a>
          </Box>
         

         

          {/* <Box className="tradefair-popup-button-container">
            <button
              className="tradefair-popup-button bodyMediumText4"
              data-cursor="hover"
            >
              <a
                style={{
                  lineHeight: 'normal',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  width: '100%',
                  height: '100%'
                }}
                href='https://messe.vendinaf.com/dehoga'
                target='_blank'
                rel='noreferrer'
              >
                {t('tradefairPopup.learnMore', 'Learn More')}
              </a>
            </button>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default TradefairPopup;
