import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import basketService from "./basketService";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../models/product";
import { Basket } from "../models/basket";

axios.defaults.baseURL = 'http://localhost:8083/api/';

const idle = () => new Promise(resolve => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async response => {
    await idle();
    return response;
  },
  (error: AxiosError) => {
    const {status} = error.response?.status; // Optional chaining for safety
    switch (status) {
      case 404:
        toast.error("Resource not Found");
        router.navigate('/not-found');
        break;
      case 500:
        toast.error("Internal server Error");
        router.navigate('/server-error');
        break;
      default:
        break;
    }
    return Promise.reject(error.message);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Store = {
  apiUrl: 'http://localhost:8083/api/products',
  list: (page: number, size: number, brandID?: number, typeId?: number, url?: string) => {
    let requestUrl = url || `products?page=${page-1}&size=${size}`;
    if (brandID !== undefined) {
      requestUrl += `&brandId=${brandID}`;
    }
    if (typeId !== undefined) {
      requestUrl += `&typeId=${typeId}`;
    }
    return requests.get(requestUrl);
  },
  details: (id: number) => requests.get(`products/${id}`),
  types: () => requests.get('products/types').then(types => [{ id: 0, name: 'All' }, ...types]),
  brands: () => requests.get('products/brands').then(brands => [{ id: 0, name: 'All' }, ...brands]),
  search: (keyword: string) => requests.get(`products?keyword=${keyword}`)
};

const Basket = {
  get: async () => {
    try {
      const basket = await basketService.getBasket();
      console.log("Basket fetched:", basket);  // Log fetched basket
      return basket;
    } catch (error) {
      console.error("Failed to get basket:", error);
      throw error;
    }
  },

  addItem: async (product: Product, dispatch: Dispatch) => {
    try {
      const result = await basketService.addItemToBasket(product, 1, dispatch);
      console.log("Item added to basket:", result);  // Log the added item
      return result;
    } catch (error) {
      console.error("Failed to add item to basket:", error);
      throw error;
    }
  },

  removeItem: async (itemId: number, dispatch: Dispatch) => {
    try {
      await basketService.remove(itemId, dispatch);
      console.log("Item removed from basket:", itemId);  // Log removed item
    } catch (error) {
      console.error("Failed to remove item from basket:", error);
      throw error;
    }
  },

  incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
    try {
      await basketService.incrementItemQuantity(itemId, quantity, dispatch);
      console.log(`Item ${itemId} quantity incremented by ${quantity}`);
    } catch (error) {
      console.log("Failed to increment quantity in the basket", error);
      throw error;
    }
  },

  decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
    try {
      await basketService.decrementItemQuantity(itemId, quantity, dispatch);
      console.log(`Item ${itemId} quantity decremented by ${quantity}`);
    } catch (error) {
      console.log("Failed to decrement quantity in the basket", error);
      throw error;
    }
  },

  deleteBasket: async (basketId: string) => {
    try {
      await basketService.deleteBasket(basketId);  // Calls basketService's deleteBasket
      console.log(`Basket ${basketId} deleted successfully.`);
    } catch (error) {
      console.log("Failed to delete Basket:", error);
      throw error;
    }
  },

  setBasket: async (basket: Basket, dispatch: Dispatch) => {
    try {
      await basketService.setBasket(basket, dispatch);
      console.log("Basket set successfully:", basket);
    } catch (error) {
      console.log("Failed to set Basket:", error);
      throw error;
    }
  }
};

const agent = {
  Store,
  Basket,
};

export default agent;
