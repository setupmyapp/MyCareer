package com.ifocus.auth.controller.service;


import com.ifocus.auth.service.UserInfoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserAuthEndPointService {

    private final UserInfoServiceImpl userInfoServiceImpl;

    @Autowired
    public UserAuthEndPointService(UserInfoServiceImpl userInfoServiceImpl) {
        this.userInfoServiceImpl = userInfoServiceImpl;
    }
    /*public ResponseEntity<?> logoutUser(LogoutUserRequest logoutUserRequest) {
        return ResponseEntity.ok("");
    }*/


}
