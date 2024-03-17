package com.example.backend.services.shoping.Service;

import com.example.backend.entities.shoping.products;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    products createNewProduct(products p, MultipartFile file, String categoryName, String type) throws IOException;
    products updateProduct(Long id, products st, MultipartFile file,String categoryName, String type) throws IOException;
    List<products> AllProducts();
    List<products> getProductsByName(String productName);
    void deleteProduct(Long id);
}
