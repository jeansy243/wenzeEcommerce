import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { Link } from "react-router-dom";

export default function BasketSummary() {
    const { basket } = useAppSelector(state => state.basket);
    const subTotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const shipping = 200;

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(price);
    };

    return (
        <Box mt={4} p={2} bgcolor="background.default" borderRadius={8} boxShadow={3}>
            <Typography variant="h5" gutterBottom>
                Basket Summary
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>SubTotal</TableCell>
                            <TableCell>{formatPrice(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Shipping</TableCell>
                            <TableCell>{formatPrice(shipping)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell>{formatPrice(subTotal + shipping)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
