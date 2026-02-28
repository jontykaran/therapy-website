package com.therapy.controller;

import com.therapy.dto.ContactRequest;
import com.therapy.service.ContactService;
import com.therapy.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactRequest request) {
        contactService.saveContact(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Thank you for your message. We will be in touch soon."));
    }

    /**
     * Debug endpoint to test email configuration.
     * Remove this endpoint before going to production!
     */
    @GetMapping("/debug/test-email")
    public ResponseEntity<Map<String, String>> testEmail() {
        String result = emailService.testConnection();
        boolean success = result.startsWith("SUCCESS");
        return ResponseEntity
                .status(success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("result", result));
    }
}
