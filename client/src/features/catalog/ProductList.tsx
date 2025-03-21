import { Grid2 } from "@mui/material"; // Correct import for Grid2 in MUI v5
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid2 container spacing={4}>
      {products.map((product) => (
        <Grid2
          key={product.id}
          xs={12}   // For mobile screens, each product takes full width (100%)
          sm={6}    // For tablets, each product takes 50% width
          md={4}    // For medium and larger screens, each product takes 33% width
        >
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
