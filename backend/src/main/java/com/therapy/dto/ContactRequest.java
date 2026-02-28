package com.therapy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be under 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 150, message = "Email must be under 150 characters")
    private String email;

    @Size(max = 20, message = "Phone number must be under 20 characters")
    private String phone;

    @NotBlank(message = "Message is required")
    @Size(max = 5000, message = "Message must be under 5000 characters")
    private String message;
}
