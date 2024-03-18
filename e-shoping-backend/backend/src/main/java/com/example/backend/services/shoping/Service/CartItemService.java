package com.example.backend.services.shoping.Service;

import com.example.backend.DTO.CartDto.GetCartDetails;
import com.example.backend.entities.User;
import com.example.backend.entities.shoping.products;

import java.util.List;

public interface CartItemService {
    List<GetCartDetails> getProductsInUserCart(String username);
    void addToCart(User user, products product, int quantity);
    void removeFromCart(User user, products product);
}