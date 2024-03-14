package com.example.backend.services.userService;

import com.example.backend.DTO.UserDto.UserWithCustomerDetails;
import com.example.backend.DTO.loginDto.LoginDto;
import com.example.backend.DTO.UserDto.UserDto;
import com.example.backend.DTO.signUpDto.registerDto;
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
 List<UserWithCustomerDetails> getAllUsersWithCustomerDetails();
 List<User> getAllUsers();
}