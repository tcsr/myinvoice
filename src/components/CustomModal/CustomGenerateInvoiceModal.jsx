import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Divider, LinearProgress } from "@mui/material";
import GenerateIcon from "../../assets/generate-icon-invoice.svg";
import SuccessIcon from "../../assets/delete-sucess.svg";
import ErrorIcon from "@mui/icons-material/Error";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "none",
  p: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 2,
};

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#1E6091',
          },
        }}
      />
    </Box>
  );
};

const CustomGenerateInvoiceModal = ({
  open,
  handleClose,
  handleCompleteAction,
  totalInvoices,
  progress,
  generationComplete,
  error,
}) => {
  const [generateIconLoaded, setGenerateIconLoaded] = useState(false);
  const [successIconLoaded, setSuccessIconLoaded] = useState(false);

  useEffect(() => {
    const loadImages = () => {
      const generateImg = new Image();
      generateImg.src = GenerateIcon;
      generateImg.onload = () => setGenerateIconLoaded(true);

      const successImg = new Image();
      successImg.src = SuccessIcon;
      successImg.onload = () => setSuccessIconLoaded(true);
    };

    loadImages();
  }, []);


  const currentInvoice = Math.ceil((progress / 100) * totalInvoices);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Box sx={style}>
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          {error ? (
            <ErrorIcon sx={{ color: "#f44336", fontSize: 100 }} />
          ) : generationComplete ? (
            successIconLoaded && (
              <img
                src={SuccessIcon}
                alt="Success"
                style={{ width: 100, height: 100 }}
              />
            )
          ) : (
            generateIconLoaded && (
              <img
                src={GenerateIcon}
                alt="Generating"
                style={{ width: 100, height: 100 }}
              />
            )
          )}
        </Box>
        {error ? (
          <>
            <Typography
              sx={{
                mt: 1,
                mb: 2,
                textAlign: "center",
                color: "#f44336", // red color for error
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Error in generating invoices
            </Typography>
            <Button
              onClick={handleClose}
              sx={{ color: "#1E6091", fontSize: "14px" }}
            >
              Close
            </Button>
          </>
        ) : generationComplete ? (
          <>
            <Typography
              id="modal-modal-title"
              sx={{
                mt: 0,
                textAlign: "center",
                color: "#2E2D2C",
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Completed Successfully
            </Typography>
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgressWithLabel value={100} />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  textAlign: "center",
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                Generated invoices successfully
              </Typography>
              <Typography
                sx={{
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                100%
              </Typography>
            </Box>
            <Divider sx={{ width: "100%", mt: 2 }} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                onClick={() => handleCompleteAction('close')}
                sx={{ color: "#1E6091", fontSize: "14px" }}
              >
                Close
              </Button>
              <Button
                onClick={() => handleCompleteAction('view')}
                style={{
                  backgroundColor: "#1E6091",
                  borderRadius: "32px",
                  fontSize: "14px",
                }}
                variant="contained"
              >
                View invoices
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              sx={{
                mt: 1,
                mb: 2,
                textAlign: "center",
                color: "#2E2D2C",
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Please wait...
            </Typography>
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                Generating invoice {currentInvoice} of {totalInvoices}
              </Typography>
              <Typography
                sx={{
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {progress}%
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CustomGenerateInvoiceModal;