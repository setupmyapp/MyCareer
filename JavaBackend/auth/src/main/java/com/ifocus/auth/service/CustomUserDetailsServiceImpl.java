package com.ifocus.auth.service;

import com.ifocus.auth.model.CustomUserDetails;
import com.ifocus.auth.model.db.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserInfoServiceImpl userInfoServiceImpl;

    @Autowired
    public CustomUserDetailsServiceImpl(UserInfoServiceImpl userInfoServiceImpl) {
        this.userInfoServiceImpl = userInfoServiceImpl;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo = userInfoServiceImpl.findByUserName(username);
        if (userInfo == null) {
            throw new UsernameNotFoundException("User not found in the db");
        }
        return CustomUserDetails.build(userInfo);
    }
}
