package com.projecttask.service;

import com.projecttask.dto.auth.AuthRequest;
import com.projecttask.model.User;
import com.projecttask.security.jwt.JwtService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class AuthServiceTest {

    @Mock AuthenticationManager authenticationManager;
    @Mock
    JwtService jwtService;
    @Mock UserService userService;
    @Mock PasswordEncoder passwordEncoder;

    @InjectMocks AuthService authService;

    @Test
    public void register_ok() {
        AuthRequest req = new AuthRequest("a200@mail.com", "anas123");
        when(userService.existsByEmail("a200@mail.com")).thenReturn(false);
        when(passwordEncoder.encode("anas123")).thenReturn("enc");

        authService.register(req);
        verify(userService).save(any(User.class));
    }

    @Test(expected = RuntimeException.class)
    public void register_emailExists() {
        AuthRequest req = new AuthRequest("a200@mail.com", "anas123");
        when(userService.existsByEmail("a200@mail.com")).thenReturn(true);
        authService.register(req);
    }

    @Test
    public void login_ok() {
        AuthRequest req = new AuthRequest("a200@mail.com", "anas123");
        when(userService.getByEmail("a200@mail.com"))
                .thenReturn(new User());
        when(jwtService.generateToken(any()))
                .thenReturn("token");
        authService.login(req);
        verify(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test(expected = BadCredentialsException.class)
    public void login_wrongPassword() {
        AuthRequest req = new AuthRequest("a200@mail.com", "wrong");
        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("bad"));
        authService.login(req);
    }
}

