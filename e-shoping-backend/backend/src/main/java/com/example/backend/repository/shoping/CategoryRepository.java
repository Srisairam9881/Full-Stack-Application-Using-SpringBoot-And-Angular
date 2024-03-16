package com.example.backend.repository.shoping;

import com.example.backend.entities.shoping.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByCategoryNameAndType(String categoryName, String categoryType);
    Category findByCategoryName(String nameOrType);
    Category findByType(String nameOrType);
}
