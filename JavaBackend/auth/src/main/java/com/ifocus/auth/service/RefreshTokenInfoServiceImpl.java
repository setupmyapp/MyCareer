package com.ifocus.auth.service;

import com.ifocus.auth.model.db.RefreshTokenInfo;
import com.ifocus.auth.model.db.UserInfo;
import com.ifocus.auth.repo.RefreshTokenInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RefreshTokenInfoServiceImpl {

    private final RefreshTokenInfoRepo refreshTokenInfoRepo;

    @Autowired
    public RefreshTokenInfoServiceImpl(RefreshTokenInfoRepo refreshTokenInfoRepo){
        this.refreshTokenInfoRepo = refreshTokenInfoRepo;
    }

    public RefreshTokenInfo findByRefreshToken(String refreshToken) {
        return refreshTokenInfoRepo.findByRefreshToken(refreshToken);
    }

    public RefreshTokenInfo findByUserInfo(UserInfo userInfo) {
        return refreshTokenInfoRepo.findByUserInfo(userInfo);
    }

    public int deleteByUserInfo(UserInfo userInfo) {
        return refreshTokenInfoRepo.deleteByUserInfo(userInfo);
    }

    public RefreshTokenInfo saveNewRefreshToken(RefreshTokenInfo refreshTokenInfo) {
        return refreshTokenInfoRepo.save(refreshTokenInfo);
    }

}
