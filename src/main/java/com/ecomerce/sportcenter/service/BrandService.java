package com.ecomerce.sportcenter.service;

import java.util.List;

import com.ecomerce.sportcenter.entity.Brand;
import com.ecomerce.sportcenter.model.BrandResponse;

public interface BrandService {
	List<BrandResponse> getAllBrands();

	Brand createBrand(Brand brand);
	
	

}

