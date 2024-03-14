package com.example.backend.services.sorting;

import com.example.backend.DTO.UserDto.UserWithCustomerDetails;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class quickSortForusers {
    public void quickSortUserWithCustomerDetails(List<UserWithCustomerDetails> usersWithDetails, int low, int high) {
        if (low < high) {
            int pi = partition(usersWithDetails, low, high);

            quickSortUserWithCustomerDetails(usersWithDetails, low, pi - 1);
            quickSortUserWithCustomerDetails(usersWithDetails, pi + 1, high);
        }
    }

    private int partition(List<UserWithCustomerDetails> usersWithDetails, int low, int high) {
        UserWithCustomerDetails pivot = usersWithDetails.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (usersWithDetails.get(j).getUser().getId() < pivot.getUser().getId()) {
                i++;
                Collections.swap(usersWithDetails, i, j);
            }
        }
        Collections.swap(usersWithDetails, i + 1, high);
        return i + 1;
    }
}
