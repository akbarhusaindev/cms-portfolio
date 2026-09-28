package com.cmsportfolio.cms_backend.util;

public class UrlSanitizer {

    public static String sanitize(String url) {
        if (url == null || url.trim().isEmpty()) {
            return url;
        }
        String clean = url.trim();
        // Fix accidental duplicate host prefix e.g. http://localhost:8080https://res.cloudinary.com/...
        if (clean.startsWith("http://localhost:8080http://") || clean.startsWith("http://localhost:8080https://")) {
            clean = clean.substring("http://localhost:8080".length());
        }
        if (clean.startsWith("https://localhost:8080http://") || clean.startsWith("https://localhost:8080https://")) {
            clean = clean.substring("https://localhost:8080".length());
        }
        return clean;
    }
}
