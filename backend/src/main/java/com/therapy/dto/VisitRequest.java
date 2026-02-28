package com.therapy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VisitRequest {

    @NotBlank(message = "Page is required")
    @Size(max = 50, message = "Page must be under 50 characters")
    private String page;

    private String referrer;
}
