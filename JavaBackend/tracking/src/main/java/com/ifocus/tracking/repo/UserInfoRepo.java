package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfo, Integer> {

    UserInfo findByUserName(String userName);
    UserInfo findByEmailId(String emailId);
}
