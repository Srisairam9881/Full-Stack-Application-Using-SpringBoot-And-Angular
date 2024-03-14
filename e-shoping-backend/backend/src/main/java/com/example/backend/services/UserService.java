package com.example.backend.services;

import com.example.backend.DTO.LoginDto;
import com.example.backend.DTO.UserDto;
import com.example.backend.DTO.registerDto;
import com.example.backend.entities.User;

import java.util.*;
public interface UserService {
 String login(LoginDto loginDto);
 String userRegister(registerDto rd);
 String adminRegister(registerDto rd);
 User getUserDetailsByUsernameOrEmail(String usernameOrEmail);
 // Update user details by username or email
 void updateUserDetailsByUsernameOrEmail(String usernameOrEmail, UserDto userDto);

 // Delete user by username or email
 void deleteUserByUsernameOrEmail(String usernameOrEmail);
 List<User> getAllAdmins();
 List<User> getAllUsers();
}