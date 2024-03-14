package com.example.backend.controller.UserController;

import com.example.backend.entities.CustomerDetails;
import com.example.backend.services.userService.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-details")
@AllArgsConstructor
public class CustomerDetailsController {
    private final CustomerService customerDetailsService;

    // Get all customer details for the currently logged-in user
    @GetMapping("/user")
    public ResponseEntity<List<CustomerDetails>> getAllCustomerDetailsForCurrentUser() {
        List<CustomerDetails> customerDetailsList = customerDetailsService.getAllCustomerDetailsForCurrentUser();
        return ResponseEntity.ok(customerDetailsList);
    }
    // Create a new customer detail for the currently logged-in user
    @PostMapping("/user")
    public ResponseEntity<CustomerDetails> createCustomerDetail(@RequestBody CustomerDetails customerDetails) {
        CustomerDetails createdDetail = customerDetailsService.createCustomerDetail(customerDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDetail);
    }
    // Update an existing customer detail for the currently logged-in user
    @PutMapping("/user/{detailId}")
    public ResponseEntity<CustomerDetails> updateCustomerDetail(@PathVariable Long detailId,
                                                                @RequestBody CustomerDetails customerDetails) {
        CustomerDetails updatedDetail = customerDetailsService.updateCustomerDetail(detailId, customerDetails);
        return ResponseEntity.ok(updatedDetail);
    }
    // Delete an existing customer detail for the currently logged-in user
    @DeleteMapping("/user/{detailId}")
    public ResponseEntity<Void> deleteCustomerDetail(@PathVariable Long detailId) {
        customerDetailsService.deleteCustomerDetail(detailId);
        return ResponseEntity.noContent().build();
    }
}


