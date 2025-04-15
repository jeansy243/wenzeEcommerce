import React from 'react';
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useFormContext();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("cardName")}
              label="Cardholder Name"
              fullWidth
              variant="standard"
              autoComplete="cc-name"
              error={!!errors.cardName}
              helperText={errors.cardName ? `Cardholder name is required` : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("cardNumber")}
              label="Card Number"
              fullWidth
              variant="standard"
              autoComplete="cc-number"
              error={!!errors.cardNumber}
              helperText={errors.cardNumber ? `Card number is required` : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("expDate")}
              label="Expiration Date"
              fullWidth
              variant="standard"
              autoComplete="cc-exp"
              error={!!errors.expDate}
              helperText={errors.expDate ? `Expiration date is required` : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("cvv")}
              label="CVV"
              fullWidth
              variant="standard"
              autoComplete="cc-csc"
              error={!!errors.cvv}
              helperText={errors.cvv ? `CVV is required` : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
