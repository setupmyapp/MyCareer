package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.RolesMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesMasterRepo extends JpaRepository<RolesMaster, Integer> {
    RolesMaster findByRollId(int rollId);
    RolesMaster findByRollName(String rollName);
}
