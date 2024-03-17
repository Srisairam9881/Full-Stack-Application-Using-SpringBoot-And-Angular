package com.example.backend.entities.shoping;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.swing.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String price;
    private String offeredPrice;
    private String noOfProducts;
    @Column(name = "created_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private LocalDateTime createdDate;
    @Column(name = "updated_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private LocalDateTime updatedDate;
    private String productImage;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
