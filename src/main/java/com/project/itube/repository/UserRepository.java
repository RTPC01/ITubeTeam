package com.project.itube.repository;

import com.project.itube.entity.User;
import com.project.itube.entity.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
