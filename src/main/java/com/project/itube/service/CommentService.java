package com.project.itube.service;

import com.project.itube.dto.WriteCommentDTO;
import com.project.itube.entity.Comment;

import java.util.List;

public interface CommentService {
    boolean uploadComment(WriteCommentDTO writeCommentDTO);
    List<Comment> getCommentListByVideoId(String id);
}
