package com.ecomerce.sportcenter.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.ecomerce.sportcenter.entity.Product;
import com.ecomerce.sportcenter.model.AdminProductResponse;


public interface AdminProductService {

	
	Product createProduct(Product product);
	
	void deleteProduct(Integer id);
	Specification<Product> searchByName(String keyword);
	Specification<Product> getByBrandId(Integer brandId);
	Specification<Product> getByTypeId(Integer typeId);
	Specification<Product> getByBrandAndType(Integer brandId, Integer typeId);
	Page<Product> getProducts(Specification<Product> spec, int page, int size);
	AdminProductResponse getProductById(Integer id);
	Product updateProduct(Integer productId, Product updatedProduct);



	Page<AdminProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword);
	
}
