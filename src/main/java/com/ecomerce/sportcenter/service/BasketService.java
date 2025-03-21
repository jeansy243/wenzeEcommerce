package com.ecomerce.sportcenter.service;

import java.util.List;

import com.ecomerce.sportcenter.entity.Basket;
import com.ecomerce.sportcenter.model.BasketResponse;



public interface BasketService {
	
	
	List<BasketResponse> getAllBaskets();
	
	BasketResponse getBasketById(String basketId);
	
	void deleteBasketById(String basketId);
	
	BasketResponse createBasket(Basket basket);

}
