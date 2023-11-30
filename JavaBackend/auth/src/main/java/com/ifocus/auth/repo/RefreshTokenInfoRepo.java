package com.ifocus.auth.repo;

import com.ifocus.auth.model.db.RefreshTokenInfo;
import com.ifocus.auth.model.db.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenInfoRepo extends JpaRepository<RefreshTokenInfo, Integer> {

    RefreshTokenInfo findByRefreshToken(String refreshToken);
    RefreshTokenInfo findByUserInfo(UserInfo userInfo);
    @Modifying
    int deleteByUserInfo(UserInfo userInfo);
}