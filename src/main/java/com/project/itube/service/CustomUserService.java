package com.project.itube.service;

import com.project.itube.common.UserStatus;
import com.project.itube.dto.RegisterUserDTO;
import com.project.itube.dto.UserInfoDTO;
import com.project.itube.entity.CustomUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface CustomUserService {
    UserStatus registerUser(MultipartFile imgFile, RegisterUserDTO registerUserDTO) throws IOException;
    CustomUserDetails findByEmail(String email);
    Optional<UserInfoDTO> getUserInfoById(String id);
    boolean checkPassword(CustomUserDetails customUserDetails, String password);
    boolean checkExistEmail(String email);
    CustomUserDetails convertToEntity(RegisterUserDTO registerUserDTO);
}
