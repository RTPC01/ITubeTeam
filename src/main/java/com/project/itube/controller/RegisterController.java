package com.project.itube.controller;

import com.project.itube.common.UserStatus;
import com.project.itube.dto.RegisterUserDTO;
import com.project.itube.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/auth/register")
public class RegisterController {

    @Autowired
    private CustomUserService customUserService;

    @PostMapping
    public ResponseEntity<String> registerUser(
            @RequestParam("profileImg")MultipartFile imgFile,
            @ModelAttribute RegisterUserDTO registerUserDTO) throws IOException {

        // 이메일이 존재하는지 확인
        if (customUserService.checkExistEmail(registerUserDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already exists");
        }
        UserStatus status = customUserService.registerUser(imgFile, registerUserDTO);
        if (status == UserStatus.SUCCESS) {
            return ResponseEntity.ok("User registered successfully");
        } else if (status == UserStatus.EMAIL_ALREADY_EXIST) {
            return ResponseEntity.badRequest().body("Email is already exists");
        } else {
            return ResponseEntity.badRequest().body("Bad Request");
        }
    }
}
