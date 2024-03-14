package com.example.backend.DTO.signUpDto;

import lombok.*;

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
