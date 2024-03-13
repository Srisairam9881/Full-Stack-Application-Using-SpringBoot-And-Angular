package com.example.backend.services.sorting;

import com.example.backend.entities.User;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class quickSort {
    public void quickSortUsers(List<User> users, int low, int high) {
        if (low < high) {
            int pi = partition(users, low, high);

            quickSortUsers(users, low, pi - 1);
            quickSortUsers(users, pi + 1, high);
        }
    }
    private int partition(List<User> users, int low, int high) {
        String pivot = users.get(high).getUsername();
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (users.get(j).getUsername().compareTo(pivot) < 0) {
                i++;

                User temp = users.get(i);
                users.set(i, users.get(j));
                users.set(j, temp);
            }
        }

        User temp = users.get(i + 1);
        users.set(i + 1, users.get(high));
        users.set(high, temp);

        return i + 1;
    }
}

