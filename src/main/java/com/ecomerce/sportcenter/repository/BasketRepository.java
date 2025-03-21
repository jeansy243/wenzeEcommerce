package com.ecomerce.sportcenter.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecomerce.sportcenter.entity.Basket;

@Repository
public interface BasketRepository extends  CrudRepository<Basket, String> {

}

