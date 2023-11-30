package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.UpSkillTypesMaster;
import com.ifocus.tracking.repo.UpSkillTypesMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UpSkillTypesMasterService {

    private final UpSkillTypesMasterRepo upSkillTypesMasterRepo;

    @Autowired
    public UpSkillTypesMasterService(UpSkillTypesMasterRepo upSkillTypesMasterRepo){
        this.upSkillTypesMasterRepo = upSkillTypesMasterRepo;
    }

    public List<UpSkillTypesMaster> findAllUpSkillTypes() {
        return upSkillTypesMasterRepo.findAll();
    }

    public UpSkillTypesMaster findByUpSkillTypeId(int upSkillTypeId) {
        return upSkillTypesMasterRepo.findByUpSkillTypeId(upSkillTypeId);
    }

    public UpSkillTypesMaster findByUpSkillTypeName(String upSkillTypeName) {
        return upSkillTypesMasterRepo.findByUpSkillTypeName(upSkillTypeName);
    }
}
