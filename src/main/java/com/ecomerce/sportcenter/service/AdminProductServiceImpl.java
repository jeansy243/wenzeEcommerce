package com.ecomerce.sportcenter.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ecomerce.sportcenter.entity.Brand;
import com.ecomerce.sportcenter.entity.Product;
import com.ecomerce.sportcenter.entity.Type;
import com.ecomerce.sportcenter.exceptions.ProductNotFoundException;
import com.ecomerce.sportcenter.model.AdminProductResponse;
import com.ecomerce.sportcenter.repository.AdminProductRepository;
import com.ecomerce.sportcenter.repository.BrandRepository;
import com.ecomerce.sportcenter.repository.TypeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    @Autowired
    private final AdminProductRepository adminProductRepository;

    @Autowired
    private final BrandRepository brandRepository;

    @Autowired
    private final TypeRepository typeRepository;

    public AdminProductServiceImpl(AdminProductRepository adminProductRepository,
                                   BrandRepository brandRepository,
                                   TypeRepository typeRepository) {
        this.adminProductRepository = adminProductRepository;
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
    }

    @Override
    public Product createProduct(Product product) {
        return adminProductRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product updatedProduct) {
        Product existingProduct = adminProductRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produit non trouvé avec ID : " + id));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setPictureUrl(updatedProduct.getPictureUrl());

        if (updatedProduct.getBrand() != null && updatedProduct.getBrand().getId() != null) {
            Brand brand = brandRepository.findById(updatedProduct.getBrand().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Marque non trouvée avec ID : " + updatedProduct.getBrand().getId()));
            existingProduct.setBrand(brand);
        }

        if (updatedProduct.getType() != null && updatedProduct.getType().getId() != null) {
            Type type = typeRepository.findById(updatedProduct.getType().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Type non trouvé avec ID : " + updatedProduct.getType().getId()));
            existingProduct.setType(type);
        }

        return adminProductRepository.save(existingProduct);
    }

    @Override
    public AdminProductResponse getProductById(Integer productId) {
        Product product = adminProductRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product doesn't exist"));
        return convertToAdminProductResponse(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        adminProductRepository.deleteById(productId);
    }

    @Override
    public Page<Product> getProducts(Specification<Product> spec, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return adminProductRepository.findAll(spec, pageable);
    }

    @Override
    public Specification<Product> searchByName(String keyword) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    @Override
    public Specification<Product> getByBrandId(Integer brandId) {
        return (root, query, cb) ->
                cb.equal(root.get("brand").get("id"), brandId);
    }

    @Override
    public Specification<Product> getByTypeId(Integer typeId) {
        return (root, query, cb) ->
                cb.equal(root.get("type").get("id"), typeId);
    }

    @Override
    public Specification<Product> getByBrandAndType(Integer brandId, Integer typeId) {
        return Specification.where(getByBrandId(brandId)).and(getByTypeId(typeId));
    }

    @Override
    public Page<AdminProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword) {
        Specification<Product> spec = Specification.where(null);

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and(searchByName(keyword));
        }
        if (brandId != null) {
            spec = spec.and(getByBrandId(brandId));
        }
        if (typeId != null) {
            spec = spec.and(getByTypeId(typeId));
        }

        return adminProductRepository.findAll(spec, pageable)
                .map(this::convertToAdminProductResponse);
    }

    private AdminProductResponse convertToAdminProductResponse(Product product) {
        return new AdminProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getPictureUrl(),
                product.getBrand().getName(),
                product.getType().getName()
        );
    }
}
