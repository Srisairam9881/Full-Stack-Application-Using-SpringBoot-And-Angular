package com.example.backend.services.UserServiceImpl;

import com.example.backend.entities.CustomerDetails;
import com.example.backend.entities.User;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.userService.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    @Override
    public List<CustomerDetails> getAllCustomerDetailsForCurrentUser() {
        Long currentUserId = getCurrentUserId();
        return customerRepository.findByUserId(currentUserId);
    }

    @Override
    public CustomerDetails createCustomerDetail(CustomerDetails customerDetails) {
        Long currentUserId = getCurrentUserId();
        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        customerDetails.setUser(user);
        return customerRepository.save(customerDetails);
    }

    @Override
    public CustomerDetails updateCustomerDetail(Long detailId, CustomerDetails customerDetails) {
        Long currentUserId = getCurrentUserId();
        CustomerDetails existingDetails = customerRepository.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Customer details not found"));
        if (!existingDetails.getUser().getId().equals(currentUserId)) {
            throw new RuntimeException("Unauthorized access");
        }
        customerDetails.setId(detailId);
        customerDetails.setUser(existingDetails.getUser());
        return customerRepository.save(customerDetails);
    }
    @Override
    public void deleteCustomerDetail(Long detailId) {
        Long currentUserId = getCurrentUserId();
        CustomerDetails existingDetails = customerRepository.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Customer details not found"));
        if (!existingDetails.getUser().getId().equals(currentUserId)) {
            throw new RuntimeException("Unauthorized access");
        }
        customerRepository.deleteById(detailId);
    }
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            String username = userDetails.getUsername();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
            return user.getId();
        }
        return null;
    }
}
