import React from "react";
import { Box, Typography } from '@mui/material';
import './HomePage.css';
import HomepageShowreel from './Homepagereel';
import Explore from './Explore';
import NafApp from "./solutionpages/NafApp";
import Clients from './Clients';
import TakeControl from './TakeControl';
import NafParagrap from './NafParagrap';
import WhatsNew from './WhatsNew';
import AnimateButton from '../../Components/CommonComponents/AnimateButton';
import AutomatsButton from "./AutomatsButton";
import Testmonials from './Testmonials';
import Sustainability from './Sustainability';
import WhoWeServe from './WhoWeServe';
import FooterLogo from '../../assets/footer/Foote-logo.svg'
import Solutions from "./Solutions";
import GradientMaskText from '../../Components/CommonComponents/GradientMaskText';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import VendImg from '../../assets/Home/Gourmet-machine.webp'
import Logourl from '../../assets/Home/NAF-logo.png'
import TradefairPopup from './TradefairPopup';

const HomePage = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  // Force canonical & URLs to German homepage
  const canonicalUrl = 'https://vendinaf.com/de';

  return (
    <Box>
      <Helmet htmlAttributes={{ lang: 'de' }}>
        {/* Page title and meta */}
        <title>{t('Home.meta.title')}</title>
        <meta name="description" content={t('Home.meta.description')} />
        <meta name="keywords" content={t('Home.meta.keywords')} />
        <meta name="author" content={t('Home.meta.author')} />
        <meta name="robots" content={t('Home.meta.robots')} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang for SEO */}
        <link rel="alternate" href="https://vendinaf.com/de" hreflang="de" />
        <link rel="alternate" href="https://vendinaf.com/en" hreflang="en" />
        <link rel="alternate" href="https://vendinaf.com/fr" hreflang="fr" />
        <link rel="alternate" href="https://vendinaf.com/es" hreflang="es" />
        <link rel="alternate" href="https://vendinaf.com/pl" hreflang="pl" />
        <link rel="alternate" href="https://vendinaf.com" hreflang="x-default" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={t('Home.meta.title')} />
        <meta property="og:description" content={t('Home.meta.description')} />
        <meta property="og:image" content={VendImg} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('Home.meta.title')} />
        <meta name="twitter:description" content={t('Home.meta.description')} />
        <meta name="twitter:image" content={VendImg} />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": t('Home.meta.title'),
            "url": "https://vendinaf.com/de",
            "description": t('Home.meta.description'),
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vendinaf.com/de/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "Organization",
              "name": "NAF Germany",
              "url": "https://vendinaf.com/de",
              "logo": Logourl,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Obere Straße 3",
                "addressLocality": "Freiberg, OT Halsbach",
                "postalCode": "09599",
                "addressCountry": "Germany"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-152-28387141",
                "contactType": "customer service",
                "email": "info@naf-halsbach.de"
              }
            }
          })}
        </script>
      </Helmet>

      <TradefairPopup />

      <Box className='main-container'>
        <Box sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%'
        }}>
          <Box sx={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            background: 'linear-gradient(155deg, rgba(127, 238, 100, 0.60) 8.85%, rgba(250, 120, 84, 0.60) 52.81%)',
            filter: 'blur(125px)',
            borderRadius: '50%',
          }} />
          <Box sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography sx={{
              color: '#fcfcfc',
              textAlign: 'center',
              maxWidth: { xs: '100%', sm: '45%', md: '45%' },
              mb: { xs: 0.5, sm: 3, md: 4 },
              letterSpacing: 4
            }} className="headings-h1">
              {t("Home.mainHeading")}
            </Typography>
            <Typography sx={{
              color: '#c2c2c4',
              textAlign: 'center',
              maxWidth: '45%'
            }} className="bodyRegularText4">
              {t("Home.mainParagraph")}
            </Typography>
            <Box data-cursor="hover" className="button-container" sx={{
              width: '100%',
              transform: 'none',
              gap: '50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              mt: 4
            }}>
              <AnimateButton route={`/de/contact`} />
              <AutomatsButton route={`/de/Automats`} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        mt: { xs: -14, md: -12, xl: -18 },
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
      }}>
        <Box
          component="img"
          loading="lazy"
          src={VendImg}
          alt="NAF Gourmet Vending Machine Delivering Fresh, High-Quality Food Options."
          sx={{
            width: { xs: "70%", sm: "70%", md: "45%", lg: "35%", xl: "30%" },
            maxWidth: "582px",
            height: "auto",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={FooterLogo}
          alt="logo"
          style={{ width: '90%', maxWidth: '1200px', height: 'auto' }}
        />
      </div>

      <HomepageShowreel />
      <Explore />
      <NafApp />
      <Clients />
      <WhoWeServe />
      <Sustainability />
      <Solutions />
      <WhatsNew />
      <NafParagrap />
      <Testmonials />
    </Box>
  );
};

export default HomePage;