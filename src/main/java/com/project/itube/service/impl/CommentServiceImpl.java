package com.project.itube.service.impl;

import com.project.itube.dto.WriteCommentDTO;
import com.project.itube.entity.Comment;
import com.project.itube.repository.CommentRepository;
import com.project.itube.repository.CustomCommentRepository;
import com.project.itube.security.SecurityUtil;
import com.project.itube.service.CommentService;
import com.project.itube.utils.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final SecurityUtil securityUtil;
    private final CommentRepository commentRepository;
    private final CustomCommentRepository customCommentRepository;

    @Autowired
    public CommentServiceImpl(SecurityUtil securityUtil,
                              CommentRepository commentRepository,
                              CustomCommentRepository customCommentRepository) {
        this.securityUtil = securityUtil;
        this.commentRepository = commentRepository;
        this.customCommentRepository = customCommentRepository;
    }

    @Override
    public boolean uploadComment(WriteCommentDTO writeCommentDTO) {
        String authorId;
        try {
            authorId = securityUtil.getCurrentUserId();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to retrieve the current user Id", e);
        }

        try {
            Comment comment = Comment.builder()
                    .videoId(writeCommentDTO.getVideoId())
                    .description(writeCommentDTO.getDescription())
                    .authorId(authorId)
                    .createdAt(DateTimeUtils.getKoreanLocalDateTime())
                    .build();
            commentRepository.save(comment);
        } catch (RuntimeException e) {
            throw new RuntimeException("Failed to write comment", e);
        }
        return true;
    }

    @Override
    public List<Comment> getCommentListByVideoId(String videoId) {
        return commentRepository.findByVideoId(videoId);
    }

    @Override
    public boolean deleteComment(String id) {
        System.out.println(id);;
        String authorId = securityUtil.getCurrentUserId();
        System.out.println(authorId);
        return customCommentRepository.deleteByIdAndAuthorId(id, authorId);
    }

    @Override
    public boolean editComment(String commentId, String commentDescription) {
        String userId = securityUtil.getCurrentUserId();
        Update update = new Update()
                .set("description", commentDescription);

        return customCommentRepository.findByIdAndAuthorIdAndUpdate(commentId, userId, update);
    }
}
