package com.ifocus.auth.controller;

import com.ifocus.auth.controller.service.UserNoAuthEndPointService;
import com.ifocus.auth.model.request.CreateUserRequest;
import com.ifocus.auth.model.request.LoginUserRequest;
import com.ifocus.auth.model.request.ValidateRefreshTokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user/NoAuth")
public class UserNoAuthEndPoint {

    private final UserNoAuthEndPointService userNoAuthEndPointService;

    @Autowired
    public UserNoAuthEndPoint(UserNoAuthEndPointService userNoAuthEndPointService) {
        this.userNoAuthEndPointService = userNoAuthEndPointService;
    }

    @PostMapping("/loginUser")
    public ResponseEntity<?> loginUserRequest(@Param(value = "Login User Request") @Valid @RequestBody LoginUserRequest loginUserRequest) {
        return userNoAuthEndPointService.loginUser(loginUserRequest);
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUserRequest(@Param(value = "Create User Request") @Valid @RequestBody CreateUserRequest createUserRequest) {
        return userNoAuthEndPointService.createUser(createUserRequest);
    }

    @PostMapping("/validateRefreshToken")
    public ResponseEntity<?> validateRefreshTokenRequest(@Param(value = "Validate Refresh Token Request") @Valid @RequestBody ValidateRefreshTokenRequest validateRefreshTokenRequest) {
        return userNoAuthEndPointService.validateRefreshToken(validateRefreshTokenRequest);
    }
}
