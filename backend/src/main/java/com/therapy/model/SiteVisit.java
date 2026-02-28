package com.therapy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "site_visits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String page;

    @Column(name = "visitor_ip", length = 45)
    private String visitorIp;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(columnDefinition = "TEXT")
    private String referrer;

    @Column(name = "visited_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime visitedAt = LocalDateTime.now();
}
