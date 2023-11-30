package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.db.UpSkillsInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpSkillsInfoRepo extends JpaRepository<UpSkillsInfo, Integer> {

    List<UpSkillsInfo> findByEmployeeInfo(EmployeeInfo employeeInfo);
    UpSkillsInfo findByUpSkillId(int upSkillId);
}
