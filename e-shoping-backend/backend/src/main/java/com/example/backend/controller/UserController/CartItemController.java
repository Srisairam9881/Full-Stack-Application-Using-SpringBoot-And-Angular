package com.example.backend.controller.UserController;

import com.example.backend.DTO.CartDto.AddToCartRequest;
import com.example.backend.DTO.CartDto.GetCartDetails;
import com.example.backend.DTO.CartDto.RemoveFromCartRequest;
import com.example.backend.entities.User;
import com.example.backend.entities.shoping.CartItem;
import com.example.backend.entities.shoping.products;
import com.example.backend.services.shoping.Service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.DTO.ProductDto.productDto;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/user/{username}")
    public ResponseEntity<List<GetCartDetails>> getProductsInUserCart(@PathVariable String username) {
        List<GetCartDetails> productsInCart = cartItemService.getProductsInUserCart(username);
        return ResponseEntity.ok(productsInCart);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody AddToCartRequest addToCartRequest) {
        User user = addToCartRequest.getUser();
        products product = addToCartRequest.getProduct();
        int quantity = addToCartRequest.getQuantity();
        cartItemService.addToCart(user, product, quantity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestBody RemoveFromCartRequest removeFromCartRequest) {
        User user = removeFromCartRequest.getUser();
        products product = removeFromCartRequest.getProduct();
        cartItemService.removeFromCart(user, product);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
