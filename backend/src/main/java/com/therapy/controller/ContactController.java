package com.therapy.controller;

import com.therapy.dto.ContactRequest;
import com.therapy.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactRequest request) {
        contactService.saveContact(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Thank you for your message. We will be in touch soon."));
    }
}
