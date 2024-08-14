package com.project.itube.repository;

import com.project.itube.entity.CustomUserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<CustomUserDetails, String> {
    CustomUserDetails findByEmail(String email);
    boolean existsByEmail(String email);
}
