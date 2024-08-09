package com.project.itube.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "videos")
@Getter @Setter @ToString
public class Video {

    @Id
    private String id;

    private String title;
    private String category;
    private String description;
    private String videoUrl;
    private LocalDateTime uploadDate;
}
