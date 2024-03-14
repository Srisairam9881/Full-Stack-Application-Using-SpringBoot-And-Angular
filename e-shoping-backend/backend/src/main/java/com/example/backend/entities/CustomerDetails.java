package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer_details")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String phoneNo;
    private int pinCode;
    private String state;
    private String city;
    private String houseNo;
    private String areaName;
    private String typeOfAddress;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference // Breaks the circular reference
    private User user;
}

