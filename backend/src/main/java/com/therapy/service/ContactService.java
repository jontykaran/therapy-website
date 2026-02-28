package com.therapy.service;

import com.therapy.dto.ContactRequest;
import com.therapy.model.ContactSubmission;
import com.therapy.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    public ContactSubmission saveContact(ContactRequest request) {
        ContactSubmission submission = ContactSubmission.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .build();

        ContactSubmission saved = contactRepository.save(submission);
        log.info("Contact submission saved with id: {}", saved.getId());

        emailService.sendContactNotification(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage()
        );

        return saved;
    }
}
