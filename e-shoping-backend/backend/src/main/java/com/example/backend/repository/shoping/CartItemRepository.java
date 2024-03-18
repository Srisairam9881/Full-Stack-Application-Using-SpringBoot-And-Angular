package com.example.backend.repository.shoping;

import com.example.backend.entities.User;
import com.example.backend.entities.shoping.CartItem;
import com.example.backend.entities.shoping.products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByUserAndProduct(User user, products product);
    List<CartItem> findByUser(User user);
}