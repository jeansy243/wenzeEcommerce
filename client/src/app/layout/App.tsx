import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const palletteType = darkMode? 'dark' : 'light';

  const theme =createTheme(
    {
      palette:{
        mode:palletteType,
      }
    }
  )
  function handleThemeChange(){
    setDarkmode(!darkMode);

  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
    <CssBaseline/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
    <Container sx={{ paddingTop:"64px"}}>
      <Outlet/>
    </Container>
    </ThemeProvider>
  );
}

export default App;
