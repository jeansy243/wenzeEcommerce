import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBasketFromLocalStorage } from "../util/util";
import { fetchCurrentUser} from "../../features/account/accountSlice"
import agent from "../api/agent";
import { setBasket } from "../../features/basket/BasketSlice";
import { useAppDispatch } from "../store/configureStore";
import Spinner from "./Spinner";

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const palletteType = darkMode? 'dark' : 'light';
  const dispatch = useAppDispatch();
  const[loading,setLoading] = useState(true);


  useEffect(()=>{
    const basket = getBasketFromLocalStorage();
    dispatch(fetchCurrentUser());
    if (basket) {
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
      
    }else{
      setLoading(false);
    }
  })
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
  if(loading)return <Spinner message="Getting Basket..."/>
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
