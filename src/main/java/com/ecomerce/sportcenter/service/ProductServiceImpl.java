package com.ecomerce.sportcenter.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ecomerce.sportcenter.entity.Product;
import com.ecomerce.sportcenter.exceptions.ProductNotFoundException;
import com.ecomerce.sportcenter.model.ProductResponse;
import com.ecomerce.sportcenter.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    // Constructeur pour l'injection du ProductRepository
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    //back office Admin
    
//    // CRUD operations
//

//
//    
//    // Modifier un produit
//    
//
//
//    
//	    
//
//	    // Récupérer tous les produits
//	    public Iterable<Product> getAllProducts() {
//	        return productRepository.findAll();
//	    }
//	    
//	    
//	    //Fin du crud Operations 

    @Override
    public ProductResponse getProductById(Integer productId) {
        // Récupérer le produit par son ID, ou lancer une exception si le produit n'existe pas
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product doesn't exist"));

        // Conversion de l'entité Product en ProductResponse
        return convertToProductResponse(product);
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword) {
        Specification<Product> spec = Specification.where(null);

        // Ajouter une condition sur la marque si un brandId est fourni
        if (brandId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> 
                criteriaBuilder.equal(root.get("brand").get("id"), brandId));
        }

        // Ajouter une condition sur le type si un typeId est fourni
        if (typeId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> 
                criteriaBuilder.equal(root.get("type").get("id"), typeId));
        }

        // Ajouter une condition sur le mot-clé si il est fourni et non vide
        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> 
                criteriaBuilder.like(root.get("name"), "%" + keyword + "%"));
        }

        // Appliquer les spécifications et retourner une page de ProductResponse
        return productRepository.findAll(spec, pageable).map(this::convertToProductResponse);
    }

    // Méthode pour convertir un Product en ProductResponse
    private ProductResponse convertToProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
            product.getDescription(),
                product.getPrice(),
                product.getPictureUrl(),
                product.getBrand().getName(), // Récupérer le nom de la marque
                product.getType().getName()   // Récupérer le nom du type
        );
    }
    

   

}
