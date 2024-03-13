package com.example.backend.controller;

import com.example.backend.DTO.JwtAuthResponse;
import com.example.backend.DTO.LoginDto;
import com.example.backend.services.Impl.UserserviceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.DTO.registerDto;
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserserviceImpl authService;
    //Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        String token = authService.login(loginDto);
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }
    //Build New User Register Rest API
    @PostMapping("/user/register")
    public ResponseEntity<String> userRegister(@RequestBody registerDto rd){
        String response=authService.userRegister(rd);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    //Build New Admin Register Rest API
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/register")
    public ResponseEntity<String> adminRegister(@RequestBody registerDto rd){
        String response=authService.adminRegister(rd);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
}
