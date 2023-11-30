package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.RolesMaster;
import com.ifocus.tracking.repo.RolesMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RolesMasterService {

    private final RolesMasterRepo rolesMasterRepo;

    @Autowired
    public RolesMasterService(RolesMasterRepo rolesMasterRepo){
        this.rolesMasterRepo = rolesMasterRepo;
    }

    public RolesMaster findByRollId(int rollId){
        return rolesMasterRepo.findByRollId(rollId);
    }

    public RolesMaster findByRollName(String rollName){
        return rolesMasterRepo.findByRollName(rollName);
    }
}
