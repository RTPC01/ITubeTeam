package com.project.itube.controller;

import com.project.itube.dto.WriteCommentDTO;
import com.project.itube.entity.Comment;
import com.project.itube.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/write")
    public ResponseEntity<String> writeComment(@ModelAttribute WriteCommentDTO writeCommentDTO) {
        try {
            commentService.uploadComment(writeCommentDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/list/{videoId}")
    public ResponseEntity<List<Comment>> getCommentListByVideoId(@PathVariable("videoId") String videoId) {
        List<Comment> commentList = commentService.getCommentListByVideoId(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(commentList);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") String commentId) {
        try {
            if (commentService.deleteComment(commentId)) {
                return ResponseEntity.status(HttpStatus.OK).body("success");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/edit/{commentId}", consumes = "text/plain")
    public ResponseEntity<String> editComment(
            @PathVariable("commentId") String commentId,
            @RequestBody String comment) {
        try {
            if (commentService.editComment(commentId, comment)) {
                return ResponseEntity.status(HttpStatus.OK).body("success");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
