package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.UserInfo;
import com.ifocus.tracking.repo.UserInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserInfoService {

    private final UserInfoRepo userInfoRepo;

    @Autowired
    public UserInfoService(UserInfoRepo userInfoRepo) {
        this.userInfoRepo = userInfoRepo;
    }

    public UserInfo findByEmailId(String emailId) {
        return userInfoRepo.findByEmailId(emailId);
    }

    public UserInfo findByUserName(String userName) {
        return userInfoRepo.findByUserName(userName);
    }
}
