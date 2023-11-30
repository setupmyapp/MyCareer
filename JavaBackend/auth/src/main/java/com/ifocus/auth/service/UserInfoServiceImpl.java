package com.ifocus.auth.service;

import com.ifocus.auth.model.db.UserInfo;
import com.ifocus.auth.model.request.CreateUserRequest;
import com.ifocus.auth.repo.UserInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserInfoServiceImpl {
    private final UserInfoRepo userInfoRepo;
    private final RolesInfoServiceImpl rolesInfoServiceImpl;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserInfoServiceImpl(UserInfoRepo userInfoRepo, RolesInfoServiceImpl rolesInfoServiceImpl, @Lazy PasswordEncoder passwordEncoder){
        this.userInfoRepo = userInfoRepo;
        this.rolesInfoServiceImpl = rolesInfoServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfo createUser(CreateUserRequest createUserRequest) {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName(createUserRequest.getUserName());
        userInfo.setPassWrd(passwordEncoder.encode(createUserRequest.getPassWrd()));
        userInfo.setEmailId(createUserRequest.getEmailId());
        userInfo.setFirstTimeLogin(true);
        userInfo.setAreAccountNonExpired(true);
        userInfo.setAreAccountNonLocked(true);
        userInfo.setAreCredentialsNonExpired(true);
        userInfo.setAreEnabled(true);
        userInfo.setRolesMaster(rolesInfoServiceImpl.findByRollName(createUserRequest.getRollName()));
        return userInfo;
    }

    public UserInfo saveUser(UserInfo userInfo) throws Exception{
        return userInfoRepo.save(userInfo);
    }

    public UserInfo findByEmailId(String emailId) {
        return userInfoRepo.findByEmailId(emailId);
    }

    public UserInfo findByUserName(String userName) {
        return userInfoRepo.findByUserName(userName);
    }
}
