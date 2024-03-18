package com.example.backend.DTO.CartDto;

import com.example.backend.entities.User;
import com.example.backend.entities.shoping.products;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddToCartRequest {
    private User user;
    private products product;
    private int quantity;
}
