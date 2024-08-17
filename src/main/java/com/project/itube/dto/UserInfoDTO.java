package com.project.itube.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoDTO {
    private String id;
    private String nickname;
    private String profileImg;
}
