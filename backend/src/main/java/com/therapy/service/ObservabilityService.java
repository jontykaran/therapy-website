package com.therapy.service;

import com.therapy.dto.VisitRequest;
import com.therapy.model.SiteVisit;
import com.therapy.repository.SiteVisitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ObservabilityService {

    private final SiteVisitRepository siteVisitRepository;

    @Async
    public void trackVisit(VisitRequest request, String visitorIp, String userAgent) {
        try {
            SiteVisit visit = SiteVisit.builder()
                    .page(request.getPage())
                    .visitorIp(visitorIp)
                    .userAgent(userAgent)
                    .referrer(request.getReferrer())
                    .build();

            siteVisitRepository.save(visit);
            log.debug("Page visit tracked: {}", request.getPage());
        } catch (Exception e) {
            log.error("Failed to track page visit: {}", e.getMessage());
        }
    }
}
