import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import ProductForm from "../backoffice/components/ProductForm";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../errors/NotFoundError";
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import ProductList from "../backoffice/components/AdminProductListManage";
import ProductUpdateForm from "../backoffice/components/EditProductForm"; // Pas de besoin de passer un `productId` ici
import SignInPage from "../../features/account/SignInPage";
import RegisterPage from "../../features/account/RegisterPage";
import RequireAuth from "./RequireAuth";
import CheckoutPage from "../../features/Checkout/CheckoutPage";
import { Dashboard } from "@mui/icons-material";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

            {
                element:<RequireAuth/>,children:[
                    {path:'checkout', element:<CheckoutPage/>},
                    { path: 'addprod', element: <ProductForm /> },
                ]
            },
            
            { path: 'dash', element: <Dashboard /> },
            { path: 'manage', element: <ProductList /> },
            { path: '', element: <HomePage /> },
            { path: 'store', element: <Catalog /> },  
            { path: 'editprod/:productId', element: <ProductUpdateForm /> }, // Ne pas passer `productId` ici
            //{ path: 'update-product/:productId', element: <ProductUpdateForm /> }, // Ne pas passer `productId` ici
            { path: 'store/:id', element: <ProductDetails /> },
            { path: 'login', element: <SignInPage /> },
            { path: 'logout', element: <SignInPage /> },
            { path: 'registerform', element: <RegisterPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'basket', element: <BasketPage /> },
            { path: '/not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> } // Redirection 404
        ]
    }
]);
