package com.ecomerce.sportcenter.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomerce.sportcenter.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	Page<Product> findAll(Specification<Product> spec, Pageable pageable);
	
	Specification<Product> searchByNameContaining(String Keyword);
	
	Specification<Product> findByBrandId(Integer brandId);
	
	Specification<Product> findByTypeId(Integer TypeId);
	
	Specification<Product> findByBrandIdAndTypeId(Integer brandId, Integer typeId);
}
