package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.UpSkillTypesMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpSkillTypesMasterRepo extends JpaRepository<UpSkillTypesMaster, Integer> {

    UpSkillTypesMaster findByUpSkillTypeId(int upSkillTypeId);
    UpSkillTypesMaster findByUpSkillTypeName(String upSkillTypeName);
}
