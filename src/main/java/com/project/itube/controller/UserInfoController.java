package com.project.itube.controller;

import com.project.itube.dto.UserInfoDTO;
import com.project.itube.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/userInfo")
public class UserInfoController {

    @Autowired
    private CustomUserService customUserService;

    @GetMapping(value = "/{userId}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable String userId) {
        Optional<UserInfoDTO> userInfo = customUserService.getUserInfoById(userId);
        return userInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
