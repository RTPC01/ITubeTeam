package com.project.itube.repository;

import com.project.itube.entity.CustomUserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<CustomUserDetails, String> {
    CustomUserDetails findByEmail(String email);
    Optional<CustomUserDetails> findById(String id);
    boolean existsByEmail(String email);
}
