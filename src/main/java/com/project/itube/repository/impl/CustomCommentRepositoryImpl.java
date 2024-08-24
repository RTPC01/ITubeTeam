package com.project.itube.repository.impl;

import com.project.itube.entity.Comment;
import com.project.itube.repository.CustomCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CustomCommentRepositoryImpl implements CustomCommentRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public boolean findByIdAndAuthorIdAndUpdate(String id, String authorId, Update update) {
        Query query = new Query(Criteria.where("id").is(id).and("authorId").is(authorId));
        Comment updatedComment = mongoTemplate.findAndModify(query, update, Comment.class);
        return updatedComment != null;
    }

    @Override
    public boolean deleteByIdAndAuthorId(String id, String authorId) {
        Query query = new Query(Criteria.where("id").is(id).and("authorId").is(authorId));
        Comment deletedComment = mongoTemplate.findAndRemove(query, Comment.class);
        return deletedComment != null;
    }
}
