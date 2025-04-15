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

    // Format the price correctly
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
        }).format(price);
    };

    // Extract the image name or return a default image name
    const extractImageName = (item: Product): string => {
        if (item?.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            return parts[parts.length - 1];
        }
        return 'default-image.jpg'; // Default image if no pictureUrl is provided
    };

    useEffect(() => {
        if (id) {
            agent.Store.details(parseInt(id))
                .then(response => {
                    setProduct(response);
                    setError(null); // Clear error message on success
                })
                .catch(error => {
                    console.error(error);
                    setError("Failed to load product details. Please try again later.");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    // Loading state
    if (loading) return <Spinner message="Loading Products..." />;
    
    // No product found
    if (!product) return <NotFound />;

    return (
        <Grid2 container spacing={6}>
            <Grid2 item xs={12} md={6}>
                <img
                    src={`/images/products/${extractImageName(product)}`}
                    alt={product.name}
                    style={{ width: '50%', objectFit: 'cover', height: 'auto' }}
                    onError={(e) => (e.currentTarget.src = './images/products/default-image.jpg')} // Fallback on error
                />
            </Grid2>
            <Grid2 item xs={12} md={6}>
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
                                <TableCell>{product.type ? product.type : 'N/A'}</TableCell> {/* Assuming 'type' is an object */}
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand ? product.brand: 'N/A'}</TableCell> {/* Assuming 'brand' is an object */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </Grid2>
    );
}
