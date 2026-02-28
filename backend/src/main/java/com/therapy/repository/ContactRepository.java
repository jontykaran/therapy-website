package com.therapy.repository;

import com.therapy.model.ContactSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactSubmission, Long> {
}
