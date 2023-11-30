package com.ifocus.auth.repo;

import com.ifocus.auth.model.db.RolesMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesMasterRepo extends JpaRepository<RolesMaster, Integer> {

    RolesMaster findByRollID(int rollID);
    RolesMaster findByRollName(String rollName);
}
