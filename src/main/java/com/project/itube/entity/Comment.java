package com.project.itube.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "comments")
@Builder
public class Comment {
    @Id
    private String id;
    private String videoId;  // 연결된 게시글(Video)의 id
    private String authorId;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}