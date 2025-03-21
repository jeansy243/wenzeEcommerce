package com.ecomerce.sportcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomerce.sportcenter.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
