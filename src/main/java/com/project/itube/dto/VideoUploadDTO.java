package com.project.itube.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter @Setter @ToString
public class VideoUploadDTO {
    private String title;
    private String category;
    private String description;
    private LocalDateTime uploadDate;

    public VideoUploadDTO() {
        this.uploadDate = LocalDateTime.now(java.time.ZoneId.of("Asia/Seoul"));
    }
}
