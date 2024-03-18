package com.example.backend.repository.shoping;

import com.example.backend.entities.shoping.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.entities.shoping.products;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<products,Long>{
    List<products> findByModelName(String modelName);
}
