


import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SharedPaymentModal from '../../Components/SharedPaymentModal';
import SolutionProductForm from '../HomePage/solutionpages/SolutionProductForm';
import Modal from '@mui/material/Modal';

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z" fill="#7FEE64" />
    </svg>
);


export default function PricingFinance() {
  const { t } = useTranslation();
  // State for controlling modal visibility and purchase method
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Handler functions for each pricing option
  const handleLeasing = () => {
    setSelectedPlan('Free');
    setModalOpen(true);
  };

  const handleRentalPurchase = () => {
    setSelectedPlan('Premium');
    setModalOpen(true);
  };

  const handleDirectPurchase = () => {
    setSelectedPlan('Enterprise');
    setModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan('');
  };

    return (




        <div  sx={{ backgroundColor: '#1A1A1A', color: '#C2C2C4', position: 'relative', overflow: 'hidden' }}>
 <Box className="section-container" sx={{ p: 0, width: '100%', boxSizing: 'border-box' }}>
          <Box sx={{ mb: { xs: 3, md: 7 }, textAlign: 'center'  }}>
            <Typography variant="h2" className='headings-h2' sx={{ color: '#fcfcfc', mb: 2, textAlign: 'center' }}>
              {t('software.plans_flexibleTitle')}
            </Typography>
            <Typography className="bodyRegularText3" sx={{ color: '#c2c2c4', mb: 4, textAlign: 'center',width:{xs:'100%', md:'80%', lg:'60%'}, mx:'auto' }}>
              {t('software.plans_flexibleSubtitle')}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              width: '100%',
              alignItems: { xs: 'center', md: 'stretch' },
              gap: { xs: 3, sm: 4, md: 3 },
            }}
          >


            {/* Leasing Option */}
            <Box
              sx={{
                width: { xs: '95%', sm: '95%', md: '100%', lg: '32%' },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#161616',
                border: '1px solid #393939',
                borderRadius: '24px !important',
                p: 2,
                maxWidth: { sm: "95%", md: '500px' },
              }}
            >
              <Box
                sx={{
                  bgcolor: '#161616',
                  width: '100%',
                  height: '100%',
                  my: 2,
                  mx: { sm: 1, md: 1 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ textAlign: 'center', mb: 2, color: '#c2c2c4' }} className="bodyRegularText2">
                  {t('software.plans_basic')}
                </Typography>

                <Typography sx={{ textAlign: 'center', mb: 2, color: '#FA7854' }} className="headings-h4">
                  €0
                </Typography>

                <Typography sx={{ textAlign: 'center', color: '#c2c2c4', mb: 1 }} className="bodyRegularText4">
                  {t('software.plans_free')}
                </Typography>
                <Typography sx={{ textAlign: 'left', color: '#c2c2c4',mt:2  }} className="bodyRegularText3">
                  {t('software.plans_basicDesc')}
                </Typography>

                <List sx={{ p: 0, my: { xs: 4, md: 4 }, flexGrow: 1 }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ListItem key={i}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <TickIcon />
                      </ListItemIcon>
                      <Typography
                        className="bodyRegularText3"
                        sx={{
                          color: '#c2c2c4',
                          lineHeight: 1.5,
                        }}
                      >
                        {t('software.plans_basic_feature' + i)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
                  <Button
                    sx={{
                      padding: '20px 32px',
                      backgroundColor: '#fcfcfc',
                      color: '#1A1A1A',
                      borderRadius: '32px',
                      textTransform: 'none',
                      m: '10px',
                      '&:hover': { backgroundColor: '#7FEE64' },
                    }}
                    className="bodyRegularText4"
                    onClick={handleLeasing} // Updated handler
                  >
                    {t('products.gourmetMachine.pricing.getStarted')}
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Hire-Purchase Option - Rental Purchase */}
            <Box
              sx={{
                width: { xs: '95%', sm: '95%', md: '100%', lg: '32%' },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#161616',
                border: '1px solid #393939',
                borderRadius: '24px !important',
                p: 2,
                maxWidth: { sm: "95%", md: '500px' },
              }}
            >
              <Box
                sx={{
                  bgcolor: '#161616',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  my: 2,
                  mx: { sm: 0, md: 1 },
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ textAlign: 'center', mb: 3, color: '#c2c2c4' }} className="bodyRegularText2">
                 {t('software.plans_premium')}
                </Typography>

                <Typography sx={{ textAlign: 'center', mb: 2, color: '#FA7854' }} className="headings-h4">
                 €99
                </Typography>

                <Typography sx={{ textAlign: 'center', color: '#c2c2c4' }} className="bodyRegularText4">
                  {t('software.plans_perMonth')}
                </Typography>
                <Typography sx={{ textAlign: 'left', color: '#c2c2c4',mt:3 }} className="bodyRegularText3">
                  {t('software.plans_premiumDesc')}
                </Typography>
                <Typography sx={{ textAlign: 'left', color: '#c2c2c4',mt:3 }} className="bodyRegularText3">
                  {t('software.plans_includesBasic')}
                </Typography>

                <List sx={{ p: 0, my: { xs: 4, md: 2 }, flexGrow: 1 }}>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <ListItem key={i}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <TickIcon />
                      </ListItemIcon>
                      <Typography
                        className="bodyRegularText3"
                        sx={{
                          color: '#c2c2c4',
                          lineHeight: 1.5,
                        }}
                      >
                        {t('software.plans_premium_feature' + i)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
                  <Button
                    sx={{
                      padding: '20px 32px',
                      backgroundColor: '#fcfcfc',
                      color: '#1A1A1A',
                      m: '10px',
                      borderRadius: '32px',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#7FEE64' },
                    }}
                    className="bodyRegularText4"
                    onClick={handleRentalPurchase} // Updated handler
                  >
                    {t('products.gourmetMachine.pricing.getStarted')}
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* Purchase Option - Direct Purchase */}
            <Box
              sx={{
                width: { xs: '95%', sm: '95%', md: '100%', lg: '32%' },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#161616',
                border: '1px solid #393939',
                borderRadius: '24px !important',
                p: 2,
                maxWidth: { sm: "95%", md: '500px' },
              }}
            >
              <Box
                sx={{
                  bgcolor: '#161616',
                  my: 2,
                  mx: { sm: 0, md: 1 },
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ textAlign: 'center', mb: 2, color: '#c2c2c4' }} className="bodyRegularText2">
                  {t('software.plans_enterprise')}
                </Typography>

                <Typography sx={{ textAlign: 'center', mb: 2, color: '#FA7854' }} className="headings-h4">
                 {t('software.plans_custom')}
                </Typography>

                <Typography sx={{ textAlign: 'left', color: '#c2c2c4', mb: 2 }} className="bodyRegularText3">
                  {t('software.plans_enterpriseDesc')}
                </Typography>
                <Typography sx={{ textAlign: 'left', color: '#c2c2c4', mt: 1 }} className="bodyRegularText3">
                  {t('software.plans_includesPremium')}
                </Typography>

                <List sx={{ p: 0, my: { xs: 4, md: 4 }, flexGrow: 1 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <ListItem key={i}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <TickIcon />
                      </ListItemIcon>
                      <Typography
                        className="bodyRegularText3"
                        sx={{
                          color: '#c2c2c4',
                          lineHeight: 1.5,
                        }}
                      >
                        {t('software.plans_enterprise_feature' + i)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
                  <Button
                    sx={{
                      padding: '20px 32px',
                      backgroundColor: '#fcfcfc',
                      color: '#1A1A1A',
                      m: '10px',
                      borderRadius: '32px',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#7FEE64' },
                    }}
                    className="bodyRegularText4"
                    onClick={handleDirectPurchase} // Updated handler
                  >
                    {t('products.gourmetMachine.pricing.getStarted')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Solution Product Form Modal for NAF Cloud */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="naf-cloud-form-modal"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1300 }}
        >
          <Box sx={{

            maxWidth: "95vw",
          maxHeight: "95vh",
          // bgcolor: "#444444",
          borderRadius: "8px",
          position: "relative",
          overflow: "auto", scrollbarWidth: 'thin',
        scrollbarColor: '#393939 #1A1A1A',}}
            onClick={e => e.stopPropagation()}
          >
            <SolutionProductForm
              preselectedPlan={selectedPlan}
              planOptions={['Free', 'Premium', 'Enterprise']}
              title={t('software.form_title_cloud')}
              onClose={handleCloseModal}
              nafCloudOnly={true}
            />
          </Box>
        </Modal>
      </div>
    );
}





