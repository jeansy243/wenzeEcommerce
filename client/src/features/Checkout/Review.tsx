import React from 'react';
import { useAppSelector } from "../../app/store/configureStore";
import { Box, Grid, Typography, Divider, Button, Card, CardContent, CardMedia, Paper } from "@mui/material";

// Formatage du prix en EUR
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(price);
};

// Extraction du nom de l'image depuis l'URL
const extractImageName = (item: Product): string | null => {
  if (item && item.pictureUrl) {
    const parts = item.pictureUrl.split('/');
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }
  return null;
};

export default function Review() {
  // Récupération du panier depuis le store
  const { basket } = useAppSelector((state) => state.basket);

  // Calcul du total du panier
  const calculateTotal = (): number => {
    return basket?.items.reduce((total, item) => total + item.quantity * item.price, 0) || 0;
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: "#2c3e50" }}>
        Review Your Order
      </Typography>

      {/* Liste des articles dans le panier */}
      <Grid container spacing={3}>
        {basket?.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                image={item.pictureUrl}
                alt={item.name}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, color: "#34495e" }}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(item.price)} x {item.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      {/* Total du panier */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Total</Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#e74c3c" }}>
          {formatPrice(calculateTotal())}
        </Typography>
      </Box>

      {/* Bouton de validation de la commande */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "12px 0",
            fontWeight: "bold",
            letterSpacing: 1.5,
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#2980b9",
            }
          }}
        >
          Confirm Order
        </Button>
      </Box>
    </Box>
  );
}
