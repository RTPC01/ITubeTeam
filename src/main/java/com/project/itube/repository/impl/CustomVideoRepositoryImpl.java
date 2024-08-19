package com.project.itube.repository.impl;

import com.project.itube.entity.Video;
import com.project.itube.repository.CustomVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CustomVideoRepositoryImpl implements CustomVideoRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public boolean findByIdAndAuthorIdAndUpdate(String id, String authorId, Update update) {
        Query query = new Query(Criteria.where("id").is(id).and("authorId").is(authorId));
        Video updatedVideo = mongoTemplate.findAndModify(query, update, Video.class);
        return updatedVideo != null;
    }

    @Override
    public boolean deleteByIdAndAuthorId(String id, String authorId) {
        Query query = new Query(Criteria.where("id").is(id).and("authorId").is(authorId));
        Video deletedVideo = mongoTemplate.findAndRemove(query, Video.class);
        return deletedVideo != null;
    }
}
