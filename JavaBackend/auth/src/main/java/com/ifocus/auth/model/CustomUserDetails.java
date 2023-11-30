package com.ifocus.auth.model;

import com.ifocus.auth.model.db.UserInfo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails{

    private int userId;
    private String userName;
    private String passWrd;
    private String emailId;
    private boolean firstTimeLogin;
    private boolean areAccountNonExpired;
    private boolean areAccountNonLocked;
    private boolean areCredentialsNonExpired;
    private boolean areEnabled;
    private Collection<? extends GrantedAuthority> authorities;

    private CustomUserDetails(int userId, String userName, String emailId, String passWrd,
                             boolean firstTimeLogin, boolean areAccountNonExpired, boolean areAccountNonLocked,
                             boolean areCredentialsNonExpired, boolean areEnabled,
                             Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.userName = userName;
        this.emailId = emailId;
        this.passWrd = passWrd;
        this.firstTimeLogin = firstTimeLogin;
        this.areAccountNonExpired = areAccountNonExpired;
        this.areAccountNonLocked = areAccountNonLocked;
        this.areCredentialsNonExpired = areCredentialsNonExpired;
        this.areEnabled = areEnabled;
        this.authorities = authorities;
    }

    public static CustomUserDetails build(UserInfo userInfo) {
        List<SimpleGrantedAuthority> simpleGrantedAuthorityList = new ArrayList<>();
        simpleGrantedAuthorityList.add(new SimpleGrantedAuthority(userInfo.getRolesMaster().getRollName()));

        return new CustomUserDetails(
                userInfo.getUserId(),
                userInfo.getUserName(),
                userInfo.getEmailId(),
                userInfo.getPassWrd(),
                userInfo.isFirstTimeLogin(),
                userInfo.isAreAccountNonExpired(),
                userInfo.isAreAccountNonLocked(),
                userInfo.isAreCredentialsNonExpired(),
                userInfo.isAreEnabled(),
                simpleGrantedAuthorityList);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return passWrd;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return areAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return areAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return areCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return areEnabled;
    }
    public int getUserId(){
        return userId;
    }
    public String getEmailId() {
        return emailId;
    }

    public boolean isFirstTimeLogin() {
        return firstTimeLogin;
    }
}
