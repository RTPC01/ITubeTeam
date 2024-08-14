package com.project.itube.security;

import com.project.itube.entity.CustomUserDetails;
import com.project.itube.exception.NotAuthenticatedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

    public CustomUserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails customUserDetails) {
                return customUserDetails;
            } else {
                throw new NotAuthenticatedException("Principal is not of type CustomUserDetails");
            }
        } else {
            throw new NotAuthenticatedException("authentication is null or not authenticated");
        }
    }

    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                return ((CustomUserDetails) principal).getId();
            } else {
                throw new NotAuthenticatedException("Principal is not of type CustomUserDetails");
            }
        } else {
            throw new NotAuthenticatedException("authentication is null or not authenticated");
        }
    }
}
