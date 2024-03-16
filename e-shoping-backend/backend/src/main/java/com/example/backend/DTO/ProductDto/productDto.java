package com.example.backend.DTO.ProductDto;

import lombok.*;
import com.example.backend.entities.shoping.products;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class productDto {
    private products p;
    private String categoryDetails;
    private String imageUrl;
}
