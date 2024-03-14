package com.example.backend.controller.UserController;

import com.example.backend.DTO.loginDto.JwtAuthResponse;
import com.example.backend.DTO.loginDto.LoginDto;
import com.example.backend.DTO.UserDto.UserDto;
import com.example.backend.DTO.signUpDto.registerDto;
import com.example.backend.entities.User;
import com.example.backend.services.UserServiceImpl.UserserviceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/register")
    public ResponseEntity<String> adminRegister(@RequestBody registerDto rd){
        String response=authService.adminRegister(rd);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    //Build Get User Details Rest API
    @GetMapping("/{usernameOrEmail}")
    public UserDto getUserDetailsByUsernameOrEmail(@PathVariable String usernameOrEmail) {
        User user = authService.getUserDetailsByUsernameOrEmail(usernameOrEmail);
        return new UserDto(user.getFirstName(),user.getLastName(),user.getPhoneNo(),user.getUsername(),user.getEmail());
    }
    // Build Update user details Rest API
    @PutMapping("/{usernameOrEmail}")
    public ResponseEntity<String> updateUserDetailsByUsernameOrEmail(@PathVariable String usernameOrEmail, @RequestBody UserDto userDto) {
        authService.updateUserDetailsByUsernameOrEmail(usernameOrEmail, userDto);
        return ResponseEntity.ok("User details updated successfully");
    }
    // Build Delete user by username or email Rest API
    @DeleteMapping("/{usernameOrEmail}")
    public ResponseEntity<String> deleteUserByUsernameOrEmail(@PathVariable String usernameOrEmail) {
        authService.deleteUserByUsernameOrEmail(usernameOrEmail);
        return ResponseEntity.ok("User deleted successfully");
    }
}
