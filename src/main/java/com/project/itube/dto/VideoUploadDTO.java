package com.project.itube.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VideoUploadDTO {
    private String id;
    private String title;
    private String category;
    private String description;
    private LocalDateTime uploadDate;

    public VideoUploadDTO() {
        this.uploadDate = LocalDateTime.now(java.time.ZoneId.of("Asia/Seoul"));
    }
}
