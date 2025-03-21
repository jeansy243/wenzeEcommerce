package com.ecomerce.sportcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomerce.sportcenter.entity.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer>{

}
