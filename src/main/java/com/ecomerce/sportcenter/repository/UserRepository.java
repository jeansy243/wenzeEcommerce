package com.ecomerce.sportcenter.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomerce.sportcenter.entity.Users;  // Correct import for Users entity

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByUsername(String username);

    Optional<Users> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    // Find users by role
    List<Users> findByRole(String role);
    
    // Check if a user exists with a specific role
    boolean existsByRole(String role);
}
