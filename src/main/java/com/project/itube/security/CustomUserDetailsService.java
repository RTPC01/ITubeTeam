package com.project.itube.security;

import com.project.itube.entity.CustomUserDetails;
import com.project.itube.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomUserDetails user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}
