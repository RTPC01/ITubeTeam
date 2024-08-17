package com.project.itube.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CurrentUserDTO {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String nickname;
    private String profileImg;
    private String phoneNumber;
    private String role;
}
