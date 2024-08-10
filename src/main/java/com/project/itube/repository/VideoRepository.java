package com.project.itube.repository;

import com.project.itube.entity.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findAll();
    List<Video> findByCategory(String category);
}
