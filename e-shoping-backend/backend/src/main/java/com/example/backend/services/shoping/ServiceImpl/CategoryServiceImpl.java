package com.example.backend.services.shoping.ServiceImpl;

import com.example.backend.entities.shoping.Category;
import com.example.backend.repository.shoping.CategoryRepository;
import com.example.backend.repository.shoping.ProductRepository;
import com.example.backend.services.shoping.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import com.example.backend.entities.shoping.products;
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Category createCategory(Category category) {
        LocalDateTime now = LocalDateTime.now();
        category.setCreatedDate(now);
        category.setUpdatedDate(now);
        return categoryRepository.save(category);
    }
    @Override
    public Category updateCategory(Long id, Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            category.setId(id);
            LocalDateTime now = LocalDateTime.now();
            category.setUpdatedDate(now);
            return categoryRepository.save(category);
        }
        return null; // Handle error: Category not found
    }
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @Override
    public Category getCategoryByNameOrType(String nameOrType) {
        // Try to find the category by name
        Category category = categoryRepository.findByCategoryName(nameOrType);
        if (category != null) {
            return category;
        }
        // If not found by name, try to find by type
        category = categoryRepository.findByType(nameOrType);
        return category;
    }
    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}