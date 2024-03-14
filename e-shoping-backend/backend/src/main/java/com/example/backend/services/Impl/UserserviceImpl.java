package com.example.backend.services.Impl;

import com.example.backend.DTO.LoginDto;
import com.example.backend.DTO.UserDto;
import com.example.backend.DTO.registerDto;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.helper.UserFoundException;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.UserService;
import com.example.backend.services.sorting.quickSort;
import com.example.backend.utils.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserserviceImpl implements UserService {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private quickSort q=new quickSort();
    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        return token;
    }
    //New Register
    @Override
    public String userRegister(registerDto rd) {
        // Check if username already exists
        if (userRepository.existingByUsername(rd.getUsername())) {
            throw new UserFoundException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        // Check if email already exists
        if (userRepository.existingByEmail(rd.getEmail())) {
            throw new UserFoundException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        // Create a new user entity
        String hashedPassword = passwordEncoder.encode(rd.getPassword());
        User user = new User();
        user.setUsername(rd.getUsername());
        user.setEmail(rd.getEmail());
        user.setPassword(hashedPassword);
        user.setFirstName(rd.getFirstName());
        user.setLastName(rd.getLastName());
        user.setPhoneNo(rd.getPhoneNo());
        // Set user roles
        Set<Role> roles = new HashSet<>();
        // Check if ROLE_USER exists
        Optional<Role> optionalUserRole = roleRepository.findByRoleName("ROLE_USER");
        if (optionalUserRole.isPresent()) {
            Role userRole = optionalUserRole.get();
            roles.add(userRole);
        } else {
            // Create and save ROLE_USER role
            Role roleUser = new Role();
            roleUser.setRoleName("ROLE_USER");
            // Set other properties of the role if needed
            roleRepository.save(roleUser);
            roles.add(roleUser);
        }
        // Assign roles to the user
        user.setRoles(roles);
        // Save the user
        userRepository.save(user);
        return "User registered successfully!";
    }

    //Create New Admin
    @Override
    public String adminRegister(registerDto rd) {
        // Check if username already exists
        if (userRepository.existingByUsername(rd.getUsername())) {
            throw new UserFoundException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        // Check if email already exists
        if (userRepository.existingByEmail(rd.getEmail())) {
            throw new UserFoundException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        // Create a new user entity
        String hashedPassword = passwordEncoder.encode(rd.getPassword());
        User user = new User();
        user.setUsername(rd.getUsername());
        user.setEmail(rd.getEmail());
        user.setPassword(hashedPassword);
        user.setFirstName(rd.getFirstName());
        user.setLastName(rd.getLastName());
        user.setPhoneNo(rd.getPhoneNo());
        // Set user roles
        Set<Role> roles = new HashSet<>();
        // Check if ROLE_ADMIN exists
        Optional<Role> optionalUserRole = roleRepository.findByRoleName("ROLE_ADMIN");
        if (optionalUserRole.isPresent()) {
            Role userRole = optionalUserRole.get();
            roles.add(userRole);
        } else {
            // Create and save ROLE_USER role
            Role roleUser = new Role();
            roleUser.setRoleName("ROLE_ADMIN");
            // Set other properties of the role if needed
            roleRepository.save(roleUser);
            roles.add(roleUser);
        }
        // Assign roles to the user
        user.setRoles(roles);
        // Save the user
        userRepository.save(user);
        return "Admin registered successfully!";
    }

    @Override
    public List<User> getAllAdmins() {
        // Fetch all users with the ROLE_ADMIN role
        Optional<Role> optionalAdminRole = roleRepository.findByRoleName("ROLE_ADMIN");
        if (optionalAdminRole.isPresent()) {
            Role adminRole = optionalAdminRole.get();
            List<User> admins = userRepository.findAllByRole(adminRole);
            q.quickSortUsers(admins, 0, admins.size() - 1); // Sort the admins list
            return admins;
        }
        return new ArrayList<>(); // Return empty list if no admins found
    }

    @Override
    public List<User> getAllUsers() {
        // Fetch all users with the ROLE_USER role

        Optional<Role> optionalUserRole = roleRepository.findByRoleName("ROLE_USER");
        if (optionalUserRole.isPresent()) {
            Role userRole = optionalUserRole.get();
            List<User> users = userRepository.findAllByRole(userRole);
            q.quickSortUsers(users, 0, users.size() - 1); // Sort the users list
            return users;
        }
        return new ArrayList<>(); // Return empty list if no users found
    }
    @Override
    public User getUserDetailsByUsernameOrEmail(String usernameOrEmail) {
        // Check if the input is an email or username
        if (usernameOrEmail.contains("@")) { // Assuming email contains @ symbol
            return userRepository.findByEmail(usernameOrEmail)
                    .orElseThrow(() -> new NoSuchElementException("User not found with email: " + usernameOrEmail));
        } else {
            return userRepository.findByUsername(usernameOrEmail)
                    .orElseThrow(() -> new NoSuchElementException("User not found with username: " + usernameOrEmail));
        }
    }
    @Override
    @Transactional
    public void updateUserDetailsByUsernameOrEmail(String usernameOrEmail, UserDto userDto) {
        User user = getUserDetailsByUsernameOrEmail(usernameOrEmail);
        // Update user details based on the provided UserDto
        // For example:
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNo(userDto.getPhoneNo());
        // Save the updated user
        userRepository.save(user);
    }
    @Override
    public void deleteUserByUsernameOrEmail(String usernameOrEmail) {
        User user = getUserDetailsByUsernameOrEmail(usernameOrEmail);
        // Check if the user exists
        if (user != null) {
            // Remove associated roles from the users_roles table
            user.getRoles().clear(); // Assuming roles are mapped in the User entity
            // Delete the user
            userRepository.delete(user);
        } else {
            throw new UserFoundException(HttpStatus.BAD_REQUEST,"Username not found");
        }
    }
}
