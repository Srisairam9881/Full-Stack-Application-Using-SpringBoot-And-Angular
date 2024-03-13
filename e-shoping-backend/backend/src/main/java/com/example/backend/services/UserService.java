package com.example.backend.services;

import com.example.backend.DTO.LoginDto;
import com.example.backend.DTO.registerDto;
import com.example.backend.entities.User;

import java.util.*;
public interface UserService {
 String login(LoginDto loginDto);
 String userRegister(registerDto rd);
 String adminRegister(registerDto rd);
 List<User> getAllAdmins();
 List<User> getAllUsers();
}