package com.example.backend.services.shoping.Service;

import com.example.backend.entities.shoping.Category;
import java.util.List;
import com.example.backend.entities.shoping.products;
public interface CategoryService {
    Category createCategory(Category category);
    Category updateCategory(Long id, Category category);
    List<Category> getAllCategories();
    Category getCategoryByNameOrType(String nameOrType);
    void deleteCategory(Long id);
}
