package com.project.itube.service.impl;

import com.project.itube.cloudinary.CloudinaryUploader;
import com.project.itube.common.UserStatus;
import com.project.itube.dto.RegisterUserDTO;
import com.project.itube.dto.UserInfoDTO;
import com.project.itube.entity.CustomUserDetails;
import com.project.itube.repository.UserRepository;
import com.project.itube.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomUserServiceImpl implements CustomUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CloudinaryUploader cloudinaryUploader;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserStatus registerUser(MultipartFile imgFile, RegisterUserDTO registerUserDTO) throws IOException {
        registerUserDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        CustomUserDetails customUserDetails = convertToEntity(registerUserDTO);
        Map uploadResult = cloudinaryUploader.uploadImage(imgFile);
        customUserDetails.setProfileImg(uploadResult.get("url").toString());
        userRepository.save(customUserDetails);
        return UserStatus.SUCCESS;
    }

    @Override
    public CustomUserDetails findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<UserInfoDTO> getUserInfoById(String id) {
        return userRepository.findById(id)
                .map(user -> new UserInfoDTO(user.getId(), user.getNickname(), user.getProfileImg()));
    }

    @Override
    public boolean checkPassword(CustomUserDetails customUserDetails, String password) {
        return passwordEncoder.matches(password, customUserDetails.getPassword());
    }

    @Override
    public boolean checkExistEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public CustomUserDetails convertToEntity(RegisterUserDTO registerUserDTO) {
        return CustomUserDetails.builder()
                .email(registerUserDTO.getEmail())
                .password(registerUserDTO.getPassword())
                .firstName(registerUserDTO.getFirstName())
                .lastName(registerUserDTO.getLastName())
                .nickname(registerUserDTO.getNickname())
                .phoneNumber(registerUserDTO.getPhoneNumber())
                .build();
    }
}
