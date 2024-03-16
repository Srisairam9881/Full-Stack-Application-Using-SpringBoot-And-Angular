package com.example.backend.services.shoping.ServiceImpl;

import com.example.backend.entities.shoping.Category;
import com.example.backend.entities.shoping.products;
import com.example.backend.repository.shoping.CategoryRepository;
import com.example.backend.repository.shoping.ProductRepository;
import com.example.backend.services.shoping.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class productServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Value("${project.image}")
    private String projectFilePath; // Retrieve project directory from properties

    private String getFileExtension(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        return originalFileName.substring(originalFileName.lastIndexOf('.'));
    }

    @Override
    public products createNewProduct(products p, MultipartFile file, String categoryName, String categoryType) throws IOException {
        // Create directory if it doesn't exist
        File directory = new File(projectFilePath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate random file name
        String imageName = UUID.randomUUID().toString() + getFileExtension(file); // Random filename
        File imageFile = new File(projectFilePath, imageName);

        // Save the image in local disk on server side
        FileOutputStream fos = new FileOutputStream(imageFile);
        fos.write(file.getBytes());
        fos.close();

        LocalDateTime now = LocalDateTime.now();
        p.setProductImage(imageName);
        p.setCreatedDate(now);
        p.setUpdatedDate(now);

        // Fetch category by name and type
        Category category = categoryRepository.findByCategoryNameAndType(categoryName, categoryType);
        if (category != null) {
            p.setCategory(category); // Set the category in the product
        } else {
            throw new RuntimeException("Category not found with name: " + categoryName + " and type: " + categoryType);
        }

        return productRepository.save(p);
    }

    @Override
    public products updateProduct(Long id, products up, MultipartFile file, String categoryName, String categoryType) throws IOException {
        products existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        LocalDateTime now = LocalDateTime.now();
        existingProduct.setProductName(up.getProductName());
        existingProduct.setPrice(up.getPrice());
        existingProduct.setDescription(up.getDescription());
        existingProduct.setOfferedPrice(up.getOfferedPrice());
        existingProduct.setUpdatedDate(now);

        // Fetch category by name and type
        Category category = categoryRepository.findByCategoryNameAndType(categoryName, categoryType);
        if (category != null) {
            existingProduct.setCategory(category); // Update the category in the product
        } else {
            throw new RuntimeException("Category not found with name: " + categoryName + " and type: " + categoryType);
        }

        // Delete the old image file if it exists
        if (existingProduct.getProductImage() != null) {
            File oldImageFile = new File(projectFilePath, existingProduct.getProductImage());
            if (oldImageFile.exists()) {
                oldImageFile.delete(); // Delete the old image file
            }
        }

        // Update profile image if provided
        if (file != null && !file.isEmpty()) {
            String imageName = UUID.randomUUID().toString() + getFileExtension(file);
            File imageFile = new File(projectFilePath, imageName);
            FileOutputStream fos = new FileOutputStream(imageFile);
            fos.write(file.getBytes());
            fos.close();
            existingProduct.setProductImage(imageName);
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public List<products> AllProducts() {
        return productRepository.findAll();
    }

    @Override
    public products getProductsByName(String productName) {
        return (products) productRepository.findByProductName(productName);
    }

    @Override
    public void deleteProduct(Long id) {
// Find the student by ID
        Optional<products> studentOptional = productRepository.findById(id);
        studentOptional.ifPresent(student -> {
            // Delete the image file from local disk
            String imageFileName = student.getProductImage();
            if (imageFileName != null && !imageFileName.isEmpty()) {
                File imageFile = new File(projectFilePath, imageFileName);
                if (imageFile.exists()) {
                    imageFile.delete();
                }
            }
            // Delete the student from the database
            productRepository.deleteById(id);
        });
    }
}

