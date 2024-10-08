package com.project.itube.controller;

import com.project.itube.dto.CurrentUserDTO;
import com.project.itube.dto.LoginRequest;
import com.project.itube.entity.CustomUserDetails;
import com.project.itube.security.JwtUtils;
import com.project.itube.security.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final SecurityUtil securityUtil;

    public LoginController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, SecurityUtil securityUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.securityUtil = securityUtil;
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<?> getCurrentUser() {
        try {
            CustomUserDetails customUserDetails = securityUtil.getCurrentUser();
            CurrentUserDTO currentUserDTO = CurrentUserDTO.builder().
                id(customUserDetails.getId()).
                email(customUserDetails.getEmail()).
                firstName(customUserDetails.getFirstName()).
                lastName(customUserDetails.getLastName()).
                nickname(customUserDetails.getNickname()).
                profileImg(customUserDetails.getProfileImg()).
                phoneNumber(customUserDetails.getPhoneNumber()).
                role(customUserDetails.getRole()).build();
            return ResponseEntity.ok(currentUserDTO);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(authentication);

            return ResponseEntity.ok(jwt);

        } catch (BadCredentialsException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
