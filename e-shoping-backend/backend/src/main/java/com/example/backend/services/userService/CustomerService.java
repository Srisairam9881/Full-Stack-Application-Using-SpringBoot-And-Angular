package com.example.backend.services.userService;

import com.example.backend.entities.CustomerDetails;
import com.example.backend.entities.User;

import java.util.List;
public interface CustomerService {
    List<CustomerDetails> getAllCustomerDetailsForCurrentUser();
    CustomerDetails createCustomerDetail(CustomerDetails customerDetails);
    CustomerDetails updateCustomerDetail(Long detailId, CustomerDetails customerDetails);
    void deleteCustomerDetail(Long detailId);
}
