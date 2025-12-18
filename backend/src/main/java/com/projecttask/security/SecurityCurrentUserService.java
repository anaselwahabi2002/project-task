package com.projecttask.security;

import com.projecttask.model.User;
import com.projecttask.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import org.springframework.security.access.AccessDeniedException;

@Component
public class SecurityCurrentUserService implements CurrentUserProvider{

    private final UserService userService;

    public SecurityCurrentUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Unauthenticated");
        }

        String email = authentication.getName();
        return userService.getByEmail(email);
    }
}

