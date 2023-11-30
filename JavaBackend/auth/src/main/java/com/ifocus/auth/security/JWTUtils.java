package com.ifocus.auth.security;

import com.ifocus.auth.model.CustomUserDetails;
import com.ifocus.auth.model.db.RefreshTokenInfo;
import com.ifocus.auth.service.RefreshTokenInfoServiceImpl;
import com.ifocus.auth.service.UserInfoServiceImpl;
import com.ifocus.auth.util.CustomUtil;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;

@Component
public class JWTUtils {

    private UserInfoServiceImpl userInfoServiceImpl;
    private RefreshTokenInfoServiceImpl refreshTokenInfoServiceImpl;

    @Autowired
    public JWTUtils(UserInfoServiceImpl userInfoServiceImpl, RefreshTokenInfoServiceImpl refreshTokenInfoServiceImpl) {
        this.userInfoServiceImpl = userInfoServiceImpl;
        this.refreshTokenInfoServiceImpl = refreshTokenInfoServiceImpl;
    }

    public String generateJWTAccessToken(Authentication authentication) {
        CustomUserDetails userDetailsPrincipal = (CustomUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setClaims(new HashMap<String, Object>())
                .setSubject(((CustomUserDetails) authentication.getPrincipal()).getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(CustomUtil.getAccessTokenTotalDuration())
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateJWTAccessToken(String userName) {

        return Jwts.builder()
                .setClaims(new HashMap<String, Object>())
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(CustomUtil.getAccessTokenTotalDuration())
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(Authentication authentication) {
        RefreshTokenInfo refreshTokenInfo = refreshTokenInfoServiceImpl.findByUserInfo(userInfoServiceImpl.findByUserName(((CustomUserDetails) authentication.getPrincipal()).getUsername()));
        if (refreshTokenInfo == null) {
            refreshTokenInfo = new RefreshTokenInfo(userInfoServiceImpl.findByUserName(((CustomUserDetails) authentication.getPrincipal()).getUsername()), CustomUtil.generateRandomUuid(), CustomUtil.getRefreshTokenTotalDuration());
        } else {
            refreshTokenInfo.setRefreshToken(CustomUtil.generateRandomUuid());
            refreshTokenInfo.setExpiryDate(CustomUtil.getRefreshTokenTotalDuration());
        }

        return refreshTokenInfoServiceImpl.saveNewRefreshToken(refreshTokenInfo).getRefreshToken();
    }

    public String generateRefreshToken(String userName) {
        RefreshTokenInfo refreshTokenInfo = refreshTokenInfoServiceImpl.findByUserInfo(userInfoServiceImpl.findByUserName(userName));
        if (refreshTokenInfo == null) {
            refreshTokenInfo = new RefreshTokenInfo(userInfoServiceImpl.findByUserName(userName), CustomUtil.generateRandomUuid(), CustomUtil.getRefreshTokenTotalDuration());
        } else {
            refreshTokenInfo.setRefreshToken(CustomUtil.generateRandomUuid());
            refreshTokenInfo.setExpiryDate(CustomUtil.getRefreshTokenTotalDuration());
        }

        return refreshTokenInfoServiceImpl.saveNewRefreshToken(refreshTokenInfo).getRefreshToken();
    }

    public String parseJWTAccessToken(String headerAuth) {
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(CustomUtil.getBearerString() + " ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    public String getUserNameFromJWTAccessToken(String authToken) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken).getBody().getSubject();
    }

    public String getUserNameFromRefreshToken(String authToken) {
        return refreshTokenInfoServiceImpl.findByRefreshToken(authToken).getUserInfo().getUserName();
    }

    public boolean validateJWTAccessToken(String authToken) throws SignatureException, MalformedJwtException, ExpiredJwtException, UnsupportedJwtException, IllegalArgumentException {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken);
        return true;
    }

    public boolean validateRefreshToken(String authToken) {
        RefreshTokenInfo refreshTokenInfo = refreshTokenInfoServiceImpl.findByRefreshToken(authToken);
        if (refreshTokenInfo == null) {
            return false;
        } else if (refreshTokenInfo.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenInfoServiceImpl.deleteByUserInfo(refreshTokenInfo.getUserInfo());
            return false;
        } else {
            return true;
        }
    }

    public static Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(getJwtSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private static String getJwtSecret() {
        return "352ebc80fcdc2e617946f7ea47cdb23dea517d688a126d41c0597693aa76fb11";
    }
}
