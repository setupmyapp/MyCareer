package com.ifocus.auth.controller.service;

import com.ifocus.auth.model.CustomUserDetails;
import com.ifocus.auth.model.db.UserInfo;
import com.ifocus.auth.model.request.CreateUserRequest;
import com.ifocus.auth.model.request.LoginUserRequest;
import com.ifocus.auth.model.request.ValidateRefreshTokenRequest;
import com.ifocus.auth.model.response.AuthEmployeeDetailsResponse;
import com.ifocus.auth.model.response.CreateUserResponse;
import com.ifocus.auth.model.response.LoginUserResponse;
import com.ifocus.auth.model.response.ValidateRefreshTokenResponse;
import com.ifocus.auth.security.JWTUtils;
import com.ifocus.auth.service.UserInfoServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserNoAuthEndPointService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jWTUtils;
    private final UserInfoServiceImpl userInfoServiceImpl;
    private final RestTemplate restTemplate;

    @Autowired
    public UserNoAuthEndPointService(AuthenticationManager authenticationManager, JWTUtils jWTUtils, UserInfoServiceImpl userInfoServiceImpl, RestTemplate restTemplate) {
        this.authenticationManager = authenticationManager;
        this.jWTUtils = jWTUtils;
        this.userInfoServiceImpl = userInfoServiceImpl;
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<?> loginUser(LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserRequest.getUserName(),
                loginUserRequest.getPassWrd()));
        if (authentication == null) {
            return ResponseEntity.badRequest().body("User Not Found" + loginUserRequest.getUserName());
        } else {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtAccessToken = jWTUtils.generateJWTAccessToken(authentication);
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            List<String> roles = customUserDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            String refreshToken = jWTUtils.generateRefreshToken(authentication);
            AuthEmployeeDetailsResponse authEmployeeDetailsResponse = restTemplate.getForObject("http://TRACKING-SERVICE/tracking/common/getEmployeeDetails/" + customUserDetails.getUserId(), AuthEmployeeDetailsResponse.class);

            return ResponseEntity.ok(new LoginUserResponse(authEmployeeDetailsResponse.getEmployeeId(), authEmployeeDetailsResponse.getEmployeeName(), customUserDetails.getUsername(), customUserDetails.getEmailId(), "Bearer", jwtAccessToken, refreshToken, String.valueOf(customUserDetails.isFirstTimeLogin()), roles));
        }
    }

    public ResponseEntity<?> createUser(CreateUserRequest createUserRequest) {
        try {
            UserInfo userInfo = userInfoServiceImpl.saveUser(userInfoServiceImpl.createUser(createUserRequest));
            return ResponseEntity.ok(new CreateUserResponse(String.valueOf(userInfo.getUserId()), userInfo.getUserName(), true, "User Info Created Successfully"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new CreateUserResponse("", createUserRequest.getUserName(), false, "User Info not created because of " + ex.getMessage()));
        }
    }

    public ResponseEntity<?> validateRefreshToken(ValidateRefreshTokenRequest validateRefreshTokenRequest) {
        String userName, refreshToken;
        try {
            if (jWTUtils.validateJWTAccessToken(validateRefreshTokenRequest.getAccessToken())) {
                userName = jWTUtils.getUserNameFromJWTAccessToken(validateRefreshTokenRequest.getAccessToken());
                return ResponseEntity.badRequest().body(new ValidateRefreshTokenResponse(null, null, false, "The JWT token is valid and still not expired! " + userName + " please use this token for all the API request!"));
            } else {
                return ResponseEntity.badRequest().body(new ValidateRefreshTokenResponse(null, null, false, "The JWT token is not valid"));
            }
        } catch (ExpiredJwtException expiredJwtException) {
            refreshToken = validateRefreshTokenRequest.getRefreshToken();
            if (jWTUtils.validateRefreshToken(refreshToken)) {
                userName = jWTUtils.getUserNameFromRefreshToken(refreshToken);
                return ResponseEntity.ok().body(new ValidateRefreshTokenResponse(jWTUtils.generateJWTAccessToken(userName), jWTUtils.generateRefreshToken(userName), true, "Access token Regenerated using Refresh token!!"));
            } else {
                return ResponseEntity.badRequest().body(new ValidateRefreshTokenResponse(null, null, false, "The Refresh token is expired! Please login Again!"));
            }
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ValidateRefreshTokenResponse(null, null, false, "The JWT token is not valid!"));
        }
    }
}
