package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.DepartmentsMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentsMasterRepo extends JpaRepository<DepartmentsMaster, Integer> {

    DepartmentsMaster findByDepartmentId(int departmentId);
    DepartmentsMaster findByDepartmentName(String departmentName);
}
