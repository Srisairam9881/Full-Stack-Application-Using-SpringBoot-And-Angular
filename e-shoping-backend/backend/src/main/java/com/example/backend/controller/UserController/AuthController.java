package com.example.backend.controller.UserController;

import com.example.backend.DTO.UserDto.UserWithCustomerDetails;
import com.example.backend.DTO.loginDto.JwtAuthResponse;
import com.example.backend.DTO.loginDto.LoginDto;
import com.example.backend.DTO.UserDto.UserDto;
import com.example.backend.DTO.signUpDto.registerDto;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.services.UserServiceImpl.CustomUserDetailsService;
import com.example.backend.services.UserServiceImpl.UserserviceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private UserserviceImpl authService;
    private CustomUserDetailsService customUserDetailsService;
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
        List<String> roles = user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList());
        return new UserDto(user.getId(),user.getFirstName(),user.getLastName(),user.getPhoneNo(),user.getUsername(),user.getEmail(),roles);
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
    //return the details of current user
    @GetMapping("/current-user")
    public ResponseEntity<UserDto> getCurrentUser(Principal principal) {
        String username = principal.getName();
        User user = authService.getUserDetailsByUsernameOrEmail(username);
        List<String> roles = user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList()); // Assuming Role has a field 'roleName' representing the name of the role
        UserDto userDto = new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNo(),
                user.getUsername(),
                user.getEmail(),
                roles
        );
        return ResponseEntity.ok(userDto);
    }
}
