package com.example.backend.PasswordEncoder;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Scanner;

class PasswordEncodeAndDecoder {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter text to encode:");
        String text = sc.nextLine();

        // Encode the text
        String encryptedText = encodePassword(text);
        System.out.println("Encoded text: " + encryptedText);

        System.out.println("Enter raw password to match:");
        String rawPassword = sc.nextLine();

        // Check if the raw password matches the encoded one
        boolean isMatch = matchPassword(rawPassword, encryptedText);
        System.out.println("Password match: " + isMatch);
    }

    public static String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public static boolean matchPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
