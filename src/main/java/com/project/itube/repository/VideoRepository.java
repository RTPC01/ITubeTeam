package com.project.itube.repository;

import com.project.itube.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findAll();
    Page<Video> findByCategory(String category, Pageable pageable);
}
