package com.example.backend.services.shoping.ServiceImpl;

import com.example.backend.DTO.CartDto.GetCartDetails;
import com.example.backend.entities.User;
import com.example.backend.entities.shoping.CartItem;
import com.example.backend.repository.shoping.CartItemRepository;
import com.example.backend.services.shoping.Service.CartItemService;
import com.example.backend.services.shoping.Service.ProductService;
import com.example.backend.services.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.entities.shoping.products;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Override
    public List<GetCartDetails> getProductsInUserCart(String username) {
        // Get the user by username
        User user = userService.getUserDetailsByUsernameOrEmail(username);
        // Fetch the cart items for the user
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        // Map CartItem objects to GetCartDetails objects with image URLs
        return cartItems.stream()
                .map(cartItem -> mapToProductDtoWithImage(cartItem))
                .collect(Collectors.toList());
    }
    // Helper method to map CartItem objects to GetCartDetails objects with image URLs
    private GetCartDetails mapToProductDtoWithImage(CartItem cartItem) {
        GetCartDetails getCartDetails = new GetCartDetails();
        products product = cartItem.getProduct();
        getCartDetails.setP(product);
        // Fetch and set the image URL from the server disk
        String imageUrl = fetchProductImageUrl(product.getProductImage());
        getCartDetails.setImageUrl(imageUrl);
        getCartDetails.setCartItem(cartItem); // Set the CartItem
        return getCartDetails;
    }
    private String fetchProductImageUrl(String imageFileName) {
        return "http://localhost:8077/images/" + imageFileName; // Example URL
    }
    @Override
    public void addToCart(User user, products product, int quantity) {
        CartItem existingCartItem = cartItemRepository.findByUserAndProduct(user, product);
        if (existingCartItem != null) {
            // If the product is already in the cart, update the quantity
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            cartItemRepository.save(existingCartItem);
        } else {
            // If the product is not in the cart, create a new cart item
            CartItem newCartItem = new CartItem();
            newCartItem.setUser(user);
            newCartItem.setProduct(product);
            newCartItem.setQuantity(quantity);
            cartItemRepository.save(newCartItem);
        }
    }



    @Override
    public void removeFromCart(User user, products product) {
        CartItem existingCartItem = cartItemRepository.findByUserAndProduct(user, product);
        if (existingCartItem != null) {
            cartItemRepository.delete(existingCartItem);
        }
    }
}
