import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography, Badge } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/BasketSlice";

// Corrected formatPrice function
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-FR', {
    style: 'currency',  
    currency: 'EUR',    
    minimumFractionDigits: 2,
  }).format(price);
};

// Example function to extract the image name (implement as needed)
const extractImageName = (item: Product): string | null => {
  if (item && item.pictureUrl) {
    const parts = item.pictureUrl.split('/');
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }
  return null;
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const basket = useAppSelector(state => state.basket); // Get basket state from store

  // Define the addItem function inside the component to access state and dispatch
  function addItem() {
    setLoading(true);
    agent.Basket.addItem(product, dispatch)
      .then(response => {
        console.log('New Basket:', response.basket);
        dispatch(setBasket(response.basket));
      })
      .catch(error => {
        console.error(error);
        alert("Failed to add item to basket. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  // Calculate the total number of items in the basket (this is a simple implementation)
  const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      />
      <CardMedia
        sx={{ height: 120, backgroundSize: 'contain' }}
        image={"./images/products/" + extractImageName(product)}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Badge badgeContent={itemCount} color="secondary">
          <Button
            loading={loading} // Disable the button while loading
            onClick={addItem}
            size="small"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            aria-label="Add to Cart" // Accessibility
          >
            Add to Cart
          </Button>
        </Badge>
        <Button component={Link} to={`/store/${product.id}`} size="small" aria-label="View Product">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
