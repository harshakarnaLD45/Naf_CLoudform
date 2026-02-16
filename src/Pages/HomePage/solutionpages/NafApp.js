import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import AnimateButton from '../../../Components/CommonComponents/AnimateButton';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import GooglePlay from '../../../assets/Home/Google Play.svg'
import AppStore from '../../../assets/Home/App Store.svg'
import NafAppImg from '../../../assets/Home/New-app-image.avif'
const NafApp = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <Box className='section-container' sx={{ mb: 0 }} >
        <Box
          sx={{
            mt: 2,
            backgroundColor: '#2d2d2d',
            borderRadius: '12px',
            px: { xs: 2, md: 4 },
            pt: { xs: 4, md: 6 },
            pb: 0,

            position: 'relative',
            overflow: 'hidden'

          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Heading */}
            <Typography
              sx={{
                width: { xs: '100%', sm: '60%', md: '48%' },
                mt: 2,
                color: '#fcfcfc',
                letterSpacing: '-0.67px'
              }}
              className="headings-h2"
            >
              {t('nafApp.heading')}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                width: { xs: '100%', sm: '60%', md: '48%' },
                mt: 2,
                color: '#c2c2c4'
              }}
              className="bodyRegularText4"
            >
              {t('nafApp.description')}
            </Typography>

            {/* Button */}
            <Box sx={{ mt: 4 }}>
              <AnimateButton text1={t('AnimateBtn.learn')} text2={t('AnimateBtn.more')} route={`/${lang}/membership`} />
            </Box>

            {/* Store Buttons */}
            {/* Store Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 6,
                flexWrap: 'wrap'
              }}
            >
              {/* Google Play */}
              <Box
                component="a"
                href="https://play.google.com/store/apps/details?id=com.naf.naf_mobile_app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block' }}
              >
                <Box
                  component="img"
                  src={GooglePlay}
                  alt="Download NAF App on Google Play"
                  sx={{ height: 40, cursor: 'pointer' }}
                />
              </Box>

              {/* App Store */}
              <Box
                component="a"
                href="https://apps.apple.com/de/app/naf-smarte-automaten/id6758438736"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block' }}
              >
                <Box
                  component="img"
                  src={AppStore}
                  alt="Download NAF App on the App Store"
                  sx={{ height: 40, cursor: 'pointer' }}
                />
              </Box>
            </Box>

            {/* App Image */}
            <Box sx={{
              position: 'relative',
              mt: 6,
              maxWidth: '800px',
              width: { xs: '280px', sm: '400px', md: '900px' },

              height: { xs: '200px', sm: '350px', md: '600px' },
              overflow: 'hidden',
            }}
            >
              <Box
                component="img"
                src={NafAppImg}
                alt="NAF App preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  bottom: { sm: '-60px', md: '-120px' },
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '35%',
                  pointerEvents: 'none',
                }}
              />


            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
}
export default NafApp;