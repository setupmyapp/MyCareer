package com.ifocus.auth.service;

import com.ifocus.auth.model.db.RolesMaster;
import com.ifocus.auth.repo.RolesMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RolesInfoServiceImpl {

    private final RolesMasterRepo rolesMasterRepo;

    @Autowired
    public RolesInfoServiceImpl(RolesMasterRepo rolesMasterRepo){
        this.rolesMasterRepo = rolesMasterRepo;
    }

    public RolesMaster findByRollID(int rollId){
        return rolesMasterRepo.findByRollID(rollId);
    }

    public RolesMaster findByRollName(String rollName){
        return rolesMasterRepo.findByRollName(rollName);
    }
}
