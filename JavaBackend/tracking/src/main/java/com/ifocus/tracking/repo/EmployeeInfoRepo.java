package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.EmployeeInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeInfoRepo extends JpaRepository<EmployeeInfo, Integer> {
    List<EmployeeInfo> findAllByAreAM(boolean areAM);
    EmployeeInfo findByEmployeeId(String employeeId);
    EmployeeInfo findByUserId(int employeeId);
    List<EmployeeInfo> findAllByUnderAM(String employeeId);
    int countByUnderAM(String employeeId);
}
