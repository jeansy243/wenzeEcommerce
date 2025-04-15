import React, { useState } from "react";
import { Box, Button, Typography, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { ValidationRules } from "./ValidationRules";

const steps = ["Shipping Address", "Review Your Order", "Payment Details"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Unknown Step");
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  // Définir les règles de validation de la validation dynamique pour chaque étape
  const currentValidationRule = ValidationRules[activeStep];

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationRule),
  });

  const handleNext = () => {
    if (methods.formState.isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      methods.trigger(); // Déclenche la validation de tous les champs
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        Checkout Page
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormProvider {...methods}>
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="primary"
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {activeStep === steps.length - 1 ? "Confirm Order" : "Next"}
            </Button>
          </Box>
        </Paper>
      </FormProvider>
    </Box>
  );
}
