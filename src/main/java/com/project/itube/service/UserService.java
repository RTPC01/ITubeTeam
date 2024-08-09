package com.project.itube.service;

import com.project.itube.common.UserStatus;
import com.project.itube.dto.LoginRequest;
import com.project.itube.entity.User;
import org.springframework.security.authentication.AuthenticationManager;

public interface UserService {
    UserStatus registerUser(User user);
    User findByEmail(String email);
    boolean checkPassword(User user, String rawPassword);
    void authenticateUser(LoginRequest loginRequest, AuthenticationManager authenticationManager);
}
