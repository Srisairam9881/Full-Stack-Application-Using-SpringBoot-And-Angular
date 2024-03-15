package com.example.backend.controller.Admin;

import com.example.backend.DTO.UserDto.UserWithCustomerDetails;
import com.example.backend.entities.User;
import com.example.backend.services.userService.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
@AllArgsConstructor
public class AdminController {
    private final UserService userService;
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> admins = userService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserWithCustomerDetails>> getAllUsersWithCustomerDetails() {
        List<UserWithCustomerDetails> usersWithDetails = userService.getAllUsersWithCustomerDetails();
        return ResponseEntity.ok(usersWithDetails);
    }
    //Build Search operation Rest API

}
