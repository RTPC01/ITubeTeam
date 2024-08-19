package com.project.itube.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "videos")
@Data
@Builder
public class Video {

    @Id
    private String id;
    private String authorId;
    private String title;
    private String category;
    private String description;
    private String videoUrl;
    private LocalDateTime uploadDate;
    private int commentCount = 0;
}
