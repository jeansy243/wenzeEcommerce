package com.ecomerce.sportcenter.service;

import com.ecomerce.sportcenter.entity.Brand;
import com.ecomerce.sportcenter.model.BrandResponse;
import com.ecomerce.sportcenter.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    // Retrieve all brands
    @Override
    public List<BrandResponse> getAllBrands() {
        List<Brand> brands = brandRepository.findAll();  // Retrieve all brands from the database
        return brands.stream()
                     .map(brand -> new BrandResponse(brand.getId(), brand.getName()))
                     .collect(Collectors.toList());
    }

    
}
