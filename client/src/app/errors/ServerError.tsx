import { Container, Grid2, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ServerError(){
    const navigate =useNavigate();
    const handleGoHome = () =>{
        navigate('/')
    }
    return(
        <Container maxWidth="md">
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                    <Typography variant="h1" color="error">
                    Aaahhiii!! Something went Wrong 
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        the server encountered an internal error and was not able to complete your request
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleGoHome}>
                        Back Home
                    </Button>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <img
                        src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                        alt="404 Error"
                        width="100%"
                        height="auto"
                    />
                </Grid2>
            </Grid2>
        </Container>
    )
}