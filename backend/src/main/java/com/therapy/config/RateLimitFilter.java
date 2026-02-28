package com.therapy.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitFilter implements Filter {

    private static final int MAX_REQUESTS_PER_MINUTE = 5;
    private final Map<String, RateLimit> rateLimits = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        if ("POST".equalsIgnoreCase(httpRequest.getMethod())
                && httpRequest.getRequestURI().startsWith("/api/contact")) {

            String clientIp = getClientIp(httpRequest);
            RateLimit rateLimit = rateLimits.computeIfAbsent(clientIp, k -> new RateLimit());

            if (!rateLimit.tryAcquire()) {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(429);
                httpResponse.setContentType("application/json");
                httpResponse.getWriter().write("{\"error\":\"Too many requests. Please try again later.\"}");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    private static class RateLimit {
        private final AtomicInteger count = new AtomicInteger(0);
        private volatile long windowStart = System.currentTimeMillis();

        boolean tryAcquire() {
            long now = System.currentTimeMillis();
            if (now - windowStart > 60_000) {
                count.set(0);
                windowStart = now;
            }
            return count.incrementAndGet() <= MAX_REQUESTS_PER_MINUTE;
        }
    }
}
