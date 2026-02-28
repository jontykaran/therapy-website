package com.therapy.controller;

import com.therapy.dto.VisitRequest;
import com.therapy.service.ObservabilityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final ObservabilityService observabilityService;

    @PostMapping("/visit")
    public ResponseEntity<Void> trackVisit(
            @Valid @RequestBody VisitRequest request,
            HttpServletRequest httpRequest) {

        String visitorIp = httpRequest.getHeader("X-Forwarded-For");
        if (visitorIp == null || visitorIp.isBlank()) {
            visitorIp = httpRequest.getRemoteAddr();
        }

        observabilityService.trackVisit(request, visitorIp, httpRequest.getHeader("User-Agent"));
        return ResponseEntity.ok().build();
    }
}
