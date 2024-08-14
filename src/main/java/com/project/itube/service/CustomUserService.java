package com.project.itube.service;

import com.project.itube.common.UserStatus;
import com.project.itube.dto.RegisterUserDTO;
import com.project.itube.entity.CustomUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CustomUserService {
    UserStatus registerUser(MultipartFile imgFile, RegisterUserDTO registerUserDTO) throws IOException;
    CustomUserDetails findByEmail(String email);
    boolean checkPassword(CustomUserDetails customUserDetails, String password);
    boolean checkExistEmail(String email);
    CustomUserDetails convertToEntity(RegisterUserDTO registerUserDTO);
}
