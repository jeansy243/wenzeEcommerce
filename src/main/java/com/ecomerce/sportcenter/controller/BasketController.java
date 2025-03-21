package com.ecomerce.sportcenter.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomerce.sportcenter.entity.Basket;
import com.ecomerce.sportcenter.entity.BasketItem;
import com.ecomerce.sportcenter.model.BasketItemResponse;
import com.ecomerce.sportcenter.model.BasketResponse;
import com.ecomerce.sportcenter.service.BasketService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/baskets")
public class BasketController {

    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    // Récupérer tous les paniers
    @GetMapping
    public List<BasketResponse> getAllBaskets() {
        return basketService.getAllBaskets();
    }

    // Récupérer un panier par son ID
    @GetMapping("/{basketId}")
    public BasketResponse getBasketById(@PathVariable String basketId) {
        return basketService.getBasketById(basketId);
    }

    // Supprimer un panier par son ID
    @DeleteMapping("/{basketId}")
    public void deleteBasketById(@PathVariable String basketId) {
        basketService.deleteBasketById(basketId);
    }

    // Créer un panier
    @PostMapping
    public ResponseEntity<BasketResponse> createBasket(@RequestBody BasketResponse basketResponse) {
    	
        Basket basket = convertToBasketEntity(basketResponse);
        
        BasketResponse createdBasket = convertToBasketResponse(basket);
        return new ResponseEntity<>(createdBasket, HttpStatus.CREATED);
    }

    // Convertir un BasketResponse en Basket (entité)
    private Basket convertToBasketEntity(BasketResponse basketResponse) {
        Basket basket = new Basket();
        basket.setId(basketResponse.getId());
        basket.setItems(mapBasketItemResponsesToEntities(basketResponse.getItems()));
        return basket;
    }

    // Convertir une liste de BasketItemResponse en une liste de BasketItem (entités)
    private List<BasketItem> mapBasketItemResponsesToEntities(List<BasketItemResponse> itemResponses) {
        if (itemResponses == null) {
            return new ArrayList<>(); // Return an empty list if the input is null
        }
        return itemResponses.stream()
                .map(this::convertToBasketItemEntity)
                .collect(Collectors.toList());
    }

    // Convertir un BasketItemResponse en un BasketItem (entité)
    private BasketItem convertToBasketItemEntity(BasketItemResponse basketItemResponse) {
        if (basketItemResponse == null) {
            return null;
        }
        BasketItem basketItem = new BasketItem();
        basketItem.setId(basketItemResponse.getId());
        basketItem.setName(basketItemResponse.getName());
        basketItem.setDescription(basketItemResponse.getDescription());
        basketItem.setPrice(basketItemResponse.getPrice());
        basketItem.setPictureUrl(basketItemResponse.getPictureUrl());
        basketItem.setProductBrand(basketItemResponse.getProductBrand());
        basketItem.setProductType(basketItemResponse.getProductType());
        basketItem.setQuantity(basketItemResponse.getQuantity());
        return basketItem;
    }

    // Convertir un Basket en BasketResponse (pour le renvoyer dans la réponse HTTP)
    private BasketResponse convertToBasketResponse(Basket basket) {
        BasketResponse basketResponse = new BasketResponse();
        basketResponse.setId(basket.getId());
        basketResponse.setItems(mapBasketItemsToResponses(basket.getItems()));
        return basketResponse;
    }

    // Convertir une liste de BasketItem en une liste de BasketItemResponse
    private List<BasketItemResponse> mapBasketItemsToResponses(List<BasketItem> items) {
        return items.stream()
                .map(this::convertToBasketItemResponse)
                .collect(Collectors.toList());
    }

    // Convertir un BasketItem en BasketItemResponse
    private BasketItemResponse convertToBasketItemResponse(BasketItem basketItem) {
        return new BasketItemResponse(
            basketItem.getId(),
            basketItem.getName(),
            basketItem.getDescription(),
            basketItem.getPrice(),
            basketItem.getPictureUrl(),
            basketItem.getProductBrand(),
            basketItem.getProductType(),
            basketItem.getQuantity()
        );
    }
}
