import axios from "axios";
import { Basket, BasketItem, BasketTotals } from "../models/basket";
import { Product } from "../models/product";
import { createId } from "@paralleldrive/cuid2";
import { Dispatch } from "@reduxjs/toolkit";
import { setBasket } from "../../features/basket/BasketSlice";


class BasketService {
  apiUrl = 'http://localhost:8083/api/baskets';

  // Récupérer le panier depuis l'API
  async getBasketFromApi() {
    try {
      const response = await axios.get<Basket>(`${this.apiUrl}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to retrieve the basket. Error:`);
    }
  }

  // Récupérer le panier depuis le localStorage
  getBasket() {
    try {
      const basket = localStorage.getItem('basket');
      if (basket) {
        return JSON.parse(basket) as Basket;
      } else {
        throw new Error("Basket not found in localStorage.");
      }
    } catch (error) {
      throw new Error(`Failed to retrieve the basket: `);
    }
  }

  // Ajouter un article dans le panier
  async addItemToBasket(item: Product, quantity = 1, dispatch: Dispatch) {
    try {
      let basket = this.getCurrentBasket();
      if (!basket) {
        basket = await this.createBasket();
      }
      const itemToAdd = this.mapProductToBasket(item);
      basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
      await this.setBasket(basket, dispatch);

      // Calcul des totaux
      const totals = this.calculateTotals(basket);
      return { basket, totals };
    } catch (error) {
      throw new Error(`Failed to add an item to the basket: `);
    }
  }

  // Retirer un article du panier
  async remove(itemId: number, dispatch: Dispatch) {
    try {
      const basket = this.getCurrentBasket();
      if (basket) {
        const itemIndex = basket.items.findIndex((p) => p.id === itemId);
        if (itemIndex !== -1) {
          basket.items.splice(itemIndex, 1); // Suppression de l'article
          await this.setBasket(basket, dispatch);
        } else {
          throw new Error(`Item with ID ${itemId} not found in the basket.`);
        }

        // Si le panier est vide, supprimer aussi du localStorage
        if (basket.items.length === 0) {
          localStorage.removeItem('basket_id');
          localStorage.removeItem('basket');
        }
      }
    } catch (error) {
      throw new Error(`Failed to remove item from basket: `);
    }
  }

  // Incrémenter la quantité d'un article dans le panier
  async incrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch) {
    try {
      const basket = this.getCurrentBasket();
      if (basket) {
        const item = basket.items.find((p) => p.id === itemId);
        if (item) {
          item.quantity += quantity;
          if (item.quantity < 1) item.quantity = 1; // On ne permet pas une quantité inférieure à 1
          await this.setBasket(basket, dispatch);
        }
      }
    } catch (error) {
      throw new Error(`Failed to increment item quantity: `);
    }
  }

  // Décrémenter la quantité d'un article dans le panier
  async decrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch) {
    try {
      const basket = this.getCurrentBasket();
      if (basket) {
        const item = basket.items.find((p) => p.id === itemId);
        if (item && item.quantity > 1) {
          item.quantity -= quantity;
          await this.setBasket(basket, dispatch);
        }
      }
    } catch (error) {
      throw new Error(`Failed to decrement item quantity.`);
    }
  }

  // Supprimer un panier entier
  async deleteBasket(basketId: string): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${basketId}`);
    } catch (error) {
      throw new Error(`Failed to delete the basket.`);
    }
  }

  // Mettre à jour le panier dans l'API et localStorage
  async setBasket(basket: Basket, dispatch: Dispatch) {
    try {
      await axios.post<Basket>(this.apiUrl, basket);
      localStorage.setItem('basket', JSON.stringify(basket));
      dispatch(setBasket(basket));
    } catch (error) {
      throw new Error(`Failed to update Basket.`);
    }
  }

  // Récupérer le panier actuel depuis le localStorage
  private getCurrentBasket(): Basket | null {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) as Basket : null;
  }

  // Créer un nouveau panier
  private createBasket(): Basket {
    try {
      const newBasket: Basket = {
        id: createId(),
        items: []
      };
      localStorage.setItem('basket_id', newBasket.id);
      return newBasket;
    } catch (error) {
      throw new Error(`Failed to create Basket.`);
    }
  }

  // Mapper un produit en élément du panier
  private mapProductToBasket(item: Product): BasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      productBrand: item.brand,
      productType: item.type
    };
  }

  // Mettre à jour ou ajouter un item dans le panier
  private upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const existingItem = items.find(x => x.id === itemToAdd.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  // Calculer les totaux du panier
  private calculateTotals(basket: Basket): BasketTotals {
    const shipping = 0; // Peut être changé selon les règles de livraison
    const subtotal = basket.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = shipping + subtotal;
    return { shipping, subtotal, total };
  }
}

export default new BasketService();
