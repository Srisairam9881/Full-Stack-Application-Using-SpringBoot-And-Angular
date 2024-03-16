package com.example.backend.controller.Admin;

import com.example.backend.DTO.ProductDto.productDto;
import com.example.backend.entities.shoping.Category;
import com.example.backend.services.shoping.Service.CategoryService;
import com.example.backend.services.shoping.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entities.shoping.products;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@RequestMapping("/api/products")
@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@ModelAttribute products p, @RequestParam("image") MultipartFile file, @RequestParam("categoryName") String categoryName, @RequestParam("categoryType") String type) {
        try {
            productService.createNewProduct(p, file, categoryName, type);
            return ResponseEntity.ok().body("Product has been added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("Something went wrong!!");
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/update")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @ModelAttribute products updatedProduct,
                                                @RequestParam(value = "image", required = false) MultipartFile file,
                                                @RequestParam("categoryName") String categoryName,
                                                @RequestParam("categoryType") String categoryType) {
        try {
            // Update the product
            productService.updateProduct(id, updatedProduct, file, categoryName, categoryType);
            return ResponseEntity.ok().body("Product has been updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("Failed to update product: " + e.getMessage());
        }
    }
    // Public endpoint to retrieve all products
    @GetMapping("/allProducts")
    public ResponseEntity<List<productDto>> getAllProducts() {
        List<products> productsList = productService.AllProducts();
        List<productDto> responses = productsList.stream()
                .map(product -> new productDto(product,getCategoryDetails(product.getCategory()),getImageUrl(product.getProductImage())))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(responses);
    }

    // Method to get category details
    @GetMapping("/{productName}")
    public ResponseEntity<productDto> getProductByName(@PathVariable String productName) {
        products product = productService.getProductsByName(productName);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        String imageUrl = getImageUrl(product.getProductImage());
        String categoryDetails = getCategoryDetails(product.getCategory()); // Assuming you have a method to get category details

        return ResponseEntity.ok().body(new productDto(product,categoryDetails,imageUrl));
    }

    // Method to get image URL
    private String getImageUrl(String imageName) {
        // Construct the URL based on your image storage logic
        return "http://localhost:8077/images/" + imageName;
    }
    // Method to get category details
    private String getCategoryDetails(Category category) {
        if (category != null) {
            return "Category Name: " + category.getCategoryName() + ", Type: " + category.getType();
        } else {
            return "No Category Assigned";
        }
    }
}
