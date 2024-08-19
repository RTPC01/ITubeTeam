package com.project.itube.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class WriteCommentDTO {
    private String videoId;
    private String description;
}
