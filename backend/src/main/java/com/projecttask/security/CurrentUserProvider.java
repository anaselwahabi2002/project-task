package com.projecttask.security;

import com.projecttask.model.User;

public interface CurrentUserProvider {
    User getCurrentUser();
}

