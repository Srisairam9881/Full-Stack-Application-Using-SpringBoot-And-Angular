package com.example.backend.DTO.CartDto;


import com.example.backend.entities.shoping.CartItem;
import lombok.*;
import com.example.backend.entities.shoping.products;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GetCartDetails {
    private products p;
    private String imageUrl;
    private CartItem cartItem;
}
