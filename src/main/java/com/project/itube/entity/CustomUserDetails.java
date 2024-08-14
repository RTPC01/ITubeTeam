package com.project.itube.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String nickname;
    private String profileImg;
    private String phoneNumber;
    private String role = "USER";
    private Collection<? extends GrantedAuthority> authorities = Collections.emptyList();;

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
