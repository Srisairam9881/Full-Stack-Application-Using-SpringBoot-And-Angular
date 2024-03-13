package com.example.backend.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class registerDto {
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String username;
    private String email;
    private String password;
}


