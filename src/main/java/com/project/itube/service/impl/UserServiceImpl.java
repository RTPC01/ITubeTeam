package com.project.itube.service.impl;

import com.project.itube.common.UserStatus;
import com.project.itube.dto.LoginRequest;
import com.project.itube.entity.User;
import com.project.itube.repository.UserRepository;
import com.project.itube.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserStatus registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return UserStatus.EMAIL_ALREADY_EXIST;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return UserStatus.SUCCESS;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public void authenticateUser(LoginRequest loginRequest, AuthenticationManager authenticationManager) {
        User user = findByEmail(loginRequest.getEmail());
        if (user == null || !checkPassword(user, loginRequest.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
    }

}
