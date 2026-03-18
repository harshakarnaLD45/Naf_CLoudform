import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  IconButton,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import AnimateButton from "../../../Components/CommonComponents/AnimateButton";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "../../MachinesPage/AutomatsPage.css";

// Map URL segments to use case types - UPDATED WITH NEW ITEMS
const urlToUseCaseMap = {
  "nafcloud": "nafCloud",
  "nafai": "nafAI",
  "telemetry-monitoring": "telemetryMonitoring",
  "payment": "payments",
  "reuse-return": "reuseReturn",
  "cloudKitchenPayments": "cloudKitchen",

  "software-integration": "softwareIntegrations",
};

// Available use case options 
const USE_CASE_OPTIONS = [

  "nafCloud",
  "nafAI",
  "telemetryMonitoring",
  "payments",
  "reuseReturn",
  "cloudKitchen",
  "softwareIntegrations",
];

/* Shared Input Style */
const standardInputStyle = {
  "& .MuiInputBase-input": {
    color: "#fff",
  },

  /* Default underline */
  "& .MuiInput-underline:before": {
    borderBottomColor: "#c2c2c4",
  },

  /* Hover underline */
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#7FEE64",
  },

  /* Focus underline */
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7FEE64",
  },

  /* Select text */
  "& .MuiSelect-select": {
    color: "#fff",
  },

  /* Select arrow icon */
  "& .MuiSvgIcon-root": {
    color: "#c2c2c4",
  },

  "&:hover .MuiSvgIcon-root": {
    color: "#7FEE64",
  },

  /* Helper text */
  "& .MuiFormHelperText-root": {
    color: "#f44336",
  },
};



const SolutionProductForm = ({ planOptions, preselectedPlan, title, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  // Extract current page/segment from URL
  const extractUseCaseFromUrl = () => {
    const segments = location.pathname.split("/").filter(Boolean);

    for (const segment of segments) {
      if (urlToUseCaseMap[segment]) {
        return urlToUseCaseMap[segment];
      }
    }
    return "";
  };


  const [formData, setFormData] = useState({
    useCaseType: preselectedPlan || "",
    email: "",
    phone: "",
    fullName: "",
    company: "",
    description: "",
    acceptedPolicy: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });



  // Set use case based on URL or preselectedPlan when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    if (preselectedPlan) {
      setFormData(prev => ({ ...prev, useCaseType: preselectedPlan }));
    } else {
      const useCaseFromUrl = extractUseCaseFromUrl();
      if (useCaseFromUrl) {
        setFormData(prev => ({
          ...prev,
          useCaseType: useCaseFromUrl,
        }));
      }
    }
  }, [location.pathname, preselectedPlan]);


  /* =========================
     Validation Functions
  ========================= */
  const validateRequired = (value) =>
    !value || value.trim() === ""
      ? t("solutionsProductForm.validation.required")
      : "";

  const validateEmail = (email) => {
    if (!email) return t("solutionsProductForm.validation.required");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
      ? ""
      : t("solutionsProductForm.validation.invalidEmail");
  };

  const validatePhone = (phone) => {
    if (!phone) return "";
    const regex = /^[+]?[0-9\s-]{7,20}$/;
    return regex.test(phone)
      ? ""
      : t("solutionsProductForm.validation.invalidPhone");
  };

  const validateFullName = (name) => {
    if (!name)
      return t("solutionsProductForm.validation.fullNameRequired");

    if (name.trim().length < 2)
      return t("solutionsProductForm.validation.fullNameTooShort");

    if (name.trim().length > 100)
      return t("solutionsProductForm.validation.fullNameTooLong");

    return "";
  };

  const validateUseCaseType = (value) => {
    return !value || value.trim() === ""
      ? t("solutionsProductForm.validation.selectUseCase")
      : "";
  };

  const validateAcceptedPolicy = (value) => {
    return !value
      ? t("solutionsProductForm.validation.acceptPolicy")
      : "";
  };

  /* =========================
     Validate All Fields
  ========================= */
  const validateForm = () => {
    const errors = {
      useCaseType: validateUseCaseType(formData.useCaseType),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      fullName: validateFullName(formData.fullName),
      acceptedPolicy: validateAcceptedPolicy(formData.acceptedPolicy),
    };
    setFormErrors(errors);
    return Object.values(errors).every((e) => e === "");
  };

  /* =========================
     Handlers
  ========================= */
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate the field when it loses focus
    let error = "";
    switch (field) {
      case "useCaseType":
        error = validateUseCaseType(formData.useCaseType);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "phone":
        error = validatePhone(formData.phone);
        break;
      case "fullName":
        error = validateFullName(formData.fullName);
        break;
      case "acceptedPolicy":
        error = validateAcceptedPolicy(formData.acceptedPolicy);
        break;
      default:
        error = "";
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      useCaseType: true,
      email: true,
      phone: true,
      fullName: true,
      acceptedPolicy: true,
    });

    // Validate form
    const errors = {
      useCaseType: validateUseCaseType(formData.useCaseType),
      email: validateEmail(formData.email),
      
      fullName: validateFullName(formData.fullName),
      acceptedPolicy: validateAcceptedPolicy(formData.acceptedPolicy),
    };
    setFormErrors(errors);

    const firstError = Object.values(errors).find((e) => e !== "");
    if (firstError) {
      // Show snackbar with first validation error
      setSnackbar({
        open: true,
        message: firstError,
        severity: "error",
      });

      // Scroll to first error field
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        enquiryType: formData.useCaseType || "",
        email: formData.email || "",
        fullName: formData.fullName || "",
        phoneNumber: formData.phone || "",
        companyName: formData.company || "",
        description: formData.description || ""
      };

      const response = await fetch("https://staging-api.naf-cloudsystem.de/api/NAFWebsite/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error("Submission error:", err);
      alert(t(`validation.submissionFailed`));
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    // Reset to URL-based use case when resetting
    const useCaseFromUrl = extractUseCaseFromUrl();

    setFormData({
      useCaseType: preselectedPlan || useCaseFromUrl || "",
      email: "",
      phone: "",
      fullName: "",
      company: "",
      description: "",
      acceptedPolicy: false,
    });
    setTouched({});
    setFormErrors({});
    setShowSuccess(false);
  };

  // Handle closing success modal and parent modal (when used in NAF Cloud page)
  const handleCloseSuccessAndModal = () => {
    setShowSuccess(false);
    if (onClose) {
      onClose(); // Close the parent modal
    }
  };

  /* =========================
     FORM
  ========================= */
  return (
    <Box
      sx={{
        bgcolor: "#161616",
        p: { xs: 1.5, md: 5 },
        borderRadius: "12px",
        border: "1px solid #393939",
        maxWidth: "700px",
        minHeight: "400px",
        mx: "auto",
        m: { sm: "auto", md: "auto" },
        position: 'relative',
      }}
    >
      {/* Close Button - Only show when onClose is provided (modal mode) */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#c2c2c4',
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            zIndex: 1,
          }}
          aria-label="close form"
        >
          <CloseIcon />
        </IconButton>
      )}

      <Typography
        sx={{
          color: "#fff",
          fontSize: { xs: "28px", md: "36px" },
          textAlign: "center",
          mb: 7,
        }}
        className="headings-h4"
      >
        {title ? title : t("solutionsProductForm.form.title")}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Select Use Case Type - Now pre-selected based on URL */}

        <FormControl fullWidth variant="standard" sx={{ mb: 3, ...standardInputStyle }}>
          <Select
            name="useCaseType"
            value={formData.useCaseType}
            onChange={handleChange}
            onBlur={() => handleBlur("useCaseType")}
            displayEmpty
            error={touched.useCaseType && !!formErrors.useCaseType}
            renderValue={(val) => {
              if (!val) {
                return (
                  <span style={{ color: "#c2c2c4" }}>
                    {t("solutionsProductForm.form.selectUseCase")}
                  </span>
                );
              }
              return t(`solutionsProductForm.useCases.${val}`);
            }}
          >
            <MenuItem value="" disabled>
              <em>{t("solutionsProductForm.form.selectUseCase")}</em>
            </MenuItem>

            {(planOptions && planOptions.length > 0 ? planOptions : USE_CASE_OPTIONS).map((item) => (
              <MenuItem key={item} value={item}>
                {t(`solutionsProductForm.useCases.${item}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Email Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder={t("solutionsProductForm.form.email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          error={touched.email && !!formErrors.email}
          sx={{ mb: 6, ...standardInputStyle }}
          required
          className="bodyRegularText4"
        />

        {/* Full Name Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder={t("solutionsProductForm.form.fullName")}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={() => handleBlur("fullName")}
          error={touched.fullName && !!formErrors.fullName}
          sx={{ mb: 6, ...standardInputStyle }}
          required
          className="bodyRegularText4"
        />

        {/* Phone Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder={t("solutionsProductForm.form.phone")}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          error={touched.phone && !!formErrors.phone}
          helperText={touched.phone && formErrors.phone}
          sx={{ mb: 6, ...standardInputStyle }}
          className="bodyRegularText4"
        />



        {/* Company Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder={t("solutionsProductForm.form.company")}
          name="company"
          value={formData.company}
          onChange={handleChange}
          sx={{ mb: 6, ...standardInputStyle }}

        />

        {/* Description Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder={t("solutionsProductForm.form.description")}
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{
            mb: 4,
            ...standardInputStyle,
            "& textarea": { color: "#fff" },
          }}
        />

        {/* Privacy Policy */}
        <Box
          className="policy-div"
          sx={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '16px' }}
        >
          <input
            type="radio"
            name="acceptedPolicy"
            checked={formData.acceptedPolicy}
            onChange={handleChange}
            onBlur={() => handleBlur("acceptedPolicy")}
            style={{
              accentColor: "#7FEE64",
              cursor: "pointer",
              width: "16px",
              height: "16px",
              marginTop: "8px",
              flexShrink: 0
            }}
          />

          <label htmlFor="agreement" className="bodyRegularText4 fixedSize" style={{ color: '#C2C2C4', cursor: 'default' }}>
            {t('machines.privacytext')}{' '}
            <a
              onClick={() => navigate(`/${lang}/privacy-policy`)}
              style={{
                textDecoration: 'underline',
                color: '#C2C2C4',
                cursor: 'pointer',
              }}
            >
              {t('contactus.privacypolicy2')}
            </a>
          </label>
        </Box>

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            position: "relative",
            zIndex: 1,
            marginBottom: { xs: "1rem", sm: "1rem", md: "2rem" },
            mt: 4,
          }}
        >
          {isSubmitting ? (
            <Button
              disabled
              variant="contained"
              sx={{
                color: '#fcfcfc',
                borderRadius: "50px",
                px: 5,
                py: 1.5,
                '&.Mui-disabled': {
                  color: '#fcfcfc',
                  opacity: 1,
                },
              }}
            >
              {t("validation.submitting")}
            </Button>
          ) : (
            <div onClick={handleSubmit} style={{ cursor: "pointer" }}>
              <AnimateButton text1={t("contactus.SUBMIT")} text2={t("contactus.NOW")} />
            </div>
          )}
        </Box>
      </Box>
       <Snackbar
                      open={snackbar.open}
                      autoHideDuration={4000}
                      onClose={() => setSnackbar({ ...snackbar, open: false })}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                      <Alert
                          onClose={() => setSnackbar({ ...snackbar, open: false })}
                          severity={snackbar.severity}
                          sx={{
                              width: "100%",
                              color: snackbar.severity === "success" ? "#21CD83" :
                                  snackbar.severity === "error" ? "red" :
                                      snackbar.severity === "warning" ? "orange" :
                                          "info.main",
                              backgroundColor: "#2a2a2a"
                          }}
                      >
                          {snackbar.message}
                      </Alert>
                  </Snackbar>

      {/* SUCCESS MESSAGE MODAL */}
      <Modal
        open={showSuccess}
        onClose={handleCloseSuccessAndModal}
        aria-labelledby="success-message-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
          '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: { xs: '90vw', sm: '90vw', md: '500px' },
            maxWidth: '98vw',
            maxHeight: { xs: '90vh', md: '95vh' },
            bgcolor: '#161616',
            borderRadius: '12px',
            border: '1px solid #393939',
            position: 'relative',
            overflow: 'auto',
            p: { xs: 1, sm: 3, md: 5 },
            pt: { xs: 2, sm: 5, md: 4 },
            textAlign: 'center',
            margin: { xs: '20px', sm: '20px', md: 'auto' },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseSuccessAndModal}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#c2c2c4',
              '&:hover': {
                color: '#fff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Success Message Content */}
          <Box sx={{ pt: 4, pb: 2, px: 2 }}>
            {/* Title */}
            <Typography
              sx={{
                color: '#fff',
                fontSize: { xs: '22px', sm: '26px', md: '32px' },
                fontWeight: 600,
                mb: 2,
                fontFamily: "'Inter', sans-serif",
              }}
              className="headings-h5"
            >
              {t("whowesurveproductform.success.title")}
            </Typography>

            {/* Message */}
            <Typography
              sx={{
                color: '#c2c2c4',
                fontSize: { xs: '14px', sm: '15px', md: '16px' },
                lineHeight: 1.6,
                mb: 4,
                maxWidth: { xs: '90vw', sm: '350px', md: '400px' },
                mx: 'auto',
              }}
              className="bodyRegularText3"
            >
              {t("whowesurveproductform.success.message")}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SolutionProductForm;