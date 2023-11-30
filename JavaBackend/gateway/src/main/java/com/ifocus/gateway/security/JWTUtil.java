package com.ifocus.gateway.security;

import com.ifocus.gateway.util.CustomUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;

@Component
public class JWTUtil {

    public String parseJWTAccessToken(String headerAuth) {
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(CustomUtil.getBearerString() + " ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    public boolean validateJWTAccessToken(String authToken) throws SignatureException, MalformedJwtException, ExpiredJwtException, UnsupportedJwtException, IllegalArgumentException {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken);
        return true;
    }
    public String getUserNameFromJWTAccessToken(String authToken) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken).getBody().getSubject();
    }

    private static Key getSignKey () {
        byte[] keyBytes = Decoders.BASE64.decode(getJwtSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private static String getJwtSecret () {
        return "352ebc80fcdc2e617946f7ea47cdb23dea517d688a126d41c0597693aa76fb11";
    }
}
