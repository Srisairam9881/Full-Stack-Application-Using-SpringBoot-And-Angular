package com.example.backend.DTO.UserDto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDto {
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String username;
    private String email;
}

