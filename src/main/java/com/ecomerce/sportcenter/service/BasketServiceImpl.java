package com.ecomerce.sportcenter.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ecomerce.sportcenter.entity.Basket;
import com.ecomerce.sportcenter.entity.BasketItem;
import com.ecomerce.sportcenter.model.BasketItemResponse;
import com.ecomerce.sportcenter.model.BasketResponse;
import com.ecomerce.sportcenter.repository.BasketRepository;

@Service
public class BasketServiceImpl implements BasketService {

    private static final Logger log = LoggerFactory.getLogger(BasketServiceImpl.class); // Déclaration du logger
    private final BasketRepository basketRepository; // Déclaration de BasketRepository

    // Constructeur pour injecter BasketRepository
    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public List<BasketResponse> getAllBaskets() {
        log.info("Récupération de tous les paniers");
        List<Basket> basketList = (List<Basket>) basketRepository.findAll(); // Utilisation de basketRepository injecté
        List<BasketResponse> basketResponse = basketList.stream()
            .map(this::convertToBasketResponse)
            .collect(Collectors.toList());
        log.info("Nombre de paniers récupérés : {}", basketResponse.size());
        log.info("Tous les paniers ont été récupérés");
        return basketResponse; // Retourner la liste correcte
    }

    @Override
    public BasketResponse getBasketById(String basketId) {
        log.info("Fetching Basket By Id:{} ",basketId);
        Optional<Basket> basketOptional = basketRepository.findById(basketId);
        if (basketOptional.isPresent()) {
        	Basket basket = basketOptional.get();
        	log.info("Fetched <Basket by Id:{}", basketId);
        	return convertToBasketResponse(basket);
        }else {
        	log.info("Basket With Id:{} Not Found ",basketId);
        }
        return null;
    }

    @Override
    public void deleteBasketById(String basketId) {
        log.info("Deleting Basket By Id:{}",basketId);
        basketRepository.deleteById(basketId);
        log.info("Deleted Basket by Id: {}",basketId);
    }

    @Override
    public BasketResponse createBasket(Basket basket) {
       log.info("Creating Basket");
       Basket savedBasket =basketRepository.save(basket);
       log.info("Basket created with Id:{}", savedBasket.getId());
        return convertToBasketResponse(savedBasket);
    }

    private BasketResponse convertToBasketResponse(Basket basket) {
        if (basket == null) {
            return null; // Si le panier est null, retourne null
        }

        // Conversion des items du panier en réponse
        List<BasketItemResponse> itemResponses = basket.getItems().stream()
            .map(this::convertToBaskeItemtResponse)  // Conversion des items
            .collect(Collectors.toList()); // Collecte des éléments dans une liste
        
        // Création de la réponse pour le panier
        BasketResponse basketResponse = new BasketResponse();
        basketResponse.setId(basket.getId());  // Setter de l'ID du panier
        basketResponse.setItems(itemResponses); // Setter des items du panier
        
        return basketResponse;
    }

    // Exemple de conversion d'un élément de panier
    private BasketItemResponse convertToBaskeItemtResponse(BasketItem basketItem) {
        // Vérification si le panier item est nul avant de tenter la conversion
        if (basketItem == null) {
            return null;
        }
        
        // Conversion de BasketItem en BasketItemResponse
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
