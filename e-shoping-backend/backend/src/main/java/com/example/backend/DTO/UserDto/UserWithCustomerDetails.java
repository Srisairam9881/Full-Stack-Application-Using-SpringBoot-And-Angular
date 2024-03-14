package com.example.backend.DTO.UserDto;

import com.example.backend.entities.CustomerDetails;
import com.example.backend.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserWithCustomerDetails {
    private User user;
    private List<CustomerDetails> customerDetailsList;

}
