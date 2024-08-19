package com.project.itube.repository;

import org.springframework.data.mongodb.core.query.Update;

public interface CustomVideoRepository {
    boolean findByIdAndAuthorIdAndUpdate(String id, String authorId, Update update);
    boolean deleteByIdAndAuthorId(String id, String authorId);
}