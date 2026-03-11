import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from 'react-i18next';
import catalogueImage from "../../assets/Machines/catalogue.svg";
import AnimateButton from "../../Components/CommonComponents/AnimateButton";
import CATPDF from '../../assets/Machines/NAF-automaten-catalogue.pdf';

const CatalogueDownloadSection = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
 <Box className='section-container'>
    <Box
        sx={{
            position: "relative",
            backgroundColor: "#393939",
            borderRadius: "24px",
            padding: { xs: "40px 20px", md: "80px 40px" },
            display: "flex",
            alignItems:{xs:"center",md:"start"},
            justifyContent: "space-between",
            flexDirection: { xs: "column",md:"row", lg: "row" },
            gap: "30px",
            overflow: "hidden",
        }}
    >
        {/* Text */}
        <Box sx={{ flex: 1, maxWidth: '55%'}}>
            <Typography
                variant="h3"
                className="headings-h4"
                sx={{ color: "#FCFCFC",textAlign:{xs:'center',md:'start'} }}
            >
                {t('catalogue.titleLine1')} <br /> {t('catalogue.titleLine2')} <br /> {t('catalogue.titleLine3')}
            </Typography>
        </Box>

        {/* Image */} 
        <Box
            sx={{
                flex: 1,
                maxWidth: '25%',
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                marginBottom: '-80px',
            }}
        >
            <img
                src={catalogueImage}
                alt="Catalogue"
                style={{
                    width: isMobile ? "180px" : "315px",
                    height: '250px',
                    borderRadius: "12px",
                }}
            />
        </Box>

        {/* Download Button */}  
        <Box sx={{ flex: 1, maxWidth: '15%' }}>
            <a
                href={CATPDF}
                download="NAF_Automaten_Katalog.pdf"
                style={{ textDecoration: "none" }}
            >
                <AnimateButton text1={t('AnimateBtn.Download')} text2={t('AnimateBtn.now')} />
            </a>
        </Box>

    </Box>
</Box>
 );
};

export default CatalogueDownloadSection;