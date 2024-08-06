package com.project.itube.controller;

import com.project.itube.common.UserStatus;
import com.project.itube.entity.User;
import com.project.itube.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        UserStatus status = userService.registerUser(user);
        if (status == UserStatus.SUCCESS) {
            return ResponseEntity.ok("User registered successfully");
        } else if (status == UserStatus.EMAIL_ALREADY_EXIST) {
            return ResponseEntity.badRequest().body("Email is already exists");
        } else {
            return ResponseEntity.badRequest().body("Bad Request");
        }
    }
}
