package com.project.itube.repository;

import com.project.itube.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByVideoId(String videoId);
}
