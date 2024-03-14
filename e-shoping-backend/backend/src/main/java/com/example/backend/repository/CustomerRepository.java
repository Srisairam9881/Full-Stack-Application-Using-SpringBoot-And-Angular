package com.example.backend.repository;

import com.example.backend.entities.CustomerDetails;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CustomerRepository extends JpaRepository<CustomerDetails, Long> {
    List<CustomerDetails> findByUserId(Long userId);
    List<CustomerDetails> findByUser(User user);
}