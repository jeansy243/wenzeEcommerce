package com.ecomerce.sportcenter.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecomerce.sportcenter.model.ProductResponse;


public interface ProductService {
	
	ProductResponse getProductById(Integer productId);
	Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword);
	
}
