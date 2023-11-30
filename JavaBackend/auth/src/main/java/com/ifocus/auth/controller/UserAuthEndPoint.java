package com.ifocus.auth.controller;

import com.ifocus.auth.controller.service.UserAuthEndPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/Auth")
public class UserAuthEndPoint {

    private final UserAuthEndPointService userAuthEndPointService;

    @Autowired
    public UserAuthEndPoint(UserAuthEndPointService userAuthEndPointService) {
        this.userAuthEndPointService = userAuthEndPointService;
    }

    /*@PostMapping("/logoutUser")
    public ResponseEntity<?> logoutUserRequest(@Param(value = "Logout User Request") @Valid @RequestBody LogoutUserRequest logoutUserRequest) {
        return userAuthEndPointService.logoutUser(logoutUserRequest);
    }*/

    /*@PutMapping("/changePassword")
    public ResponseEntity<?> changePasswordRequest(@Param(value = "Change Password Request") @Valid @RequestBody LogoutUserRequest logoutUserRequest) {
        return userAuthEndPointService.logoutUser(logoutUserRequest);
    }*/
}
