import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFoundError";
import Spinner from "../../app/layout/Spinner";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Corrected formatPrice function
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR', // You can adjust currency to 'USD' if needed
            minimumFractionDigits: 2,
        }).format(price);
    };

    // Improved extractImageName function with better error handling
    const extractImageName = (item: Product): string => {
        if (item?.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            return parts[parts.length - 1];  // Returns the image file name
        }
        return 'default-image.jpg'; // Default image in case pictureUrl is not found
    };

    useEffect(() => {
        if (id) {
            agent.Store.details(parseInt(id))
                .then(response => {
                    setProduct(response);
                    setError(null); // Reset error in case of success
                })
                .catch(error => {
                    console.error(error);
                    setError("Failed to load product details. Please try again later.");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

     if (loading) return <Spinner message ='Loading Products...'/>
    if (!product) return <NotFound/>

    return (
        <Grid2 container spacing={6}>
            <Grid2 >
                <img 
                    src={`/images/products/${extractImageName(product)}`} 
                    alt={product.name} 
                    style={{ width: '100%' }} 
                />
            </Grid2>
            <Grid2 >
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography gutterBottom color="secondary" variant="h4">{formatPrice(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </Grid2>
    );
}
