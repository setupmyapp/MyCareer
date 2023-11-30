package com.ifocus.auth.util;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

public class CustomUtil {

    private static long ACCESS_TOKEN_EXPIRY_DURATION = 60L;
    private static long REFRESH_TOKEN_EXPIRY_DURATION = 4320L;

    private CustomUtil() {
        throw new UnsupportedOperationException("Cannot instantiate a Util class");
    }

    public static String generateRandomUuid() {
        return UUID.randomUUID().toString();
    }

    public static String getBearerString() {
        return "Bearer";
    }

    public static Date getAccessTokenTotalDuration() {
        return new Date(System.currentTimeMillis() + (ACCESS_TOKEN_EXPIRY_DURATION * 60 * 1000));
    }

    public static Instant getRefreshTokenTotalDuration() {
        return Instant.now().plusMillis(REFRESH_TOKEN_EXPIRY_DURATION * 60 * 1000);
    }
}
