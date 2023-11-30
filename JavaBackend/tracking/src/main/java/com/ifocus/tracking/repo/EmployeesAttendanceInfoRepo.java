package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.EmployeesAttendanceInfo;
import com.ifocus.tracking.model.db.pkid.EmployeesAttendancePKId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeesAttendanceInfoRepo extends JpaRepository<EmployeesAttendanceInfo, EmployeesAttendancePKId> {

    EmployeesAttendanceInfo findByEmployeesAttendancePKId(EmployeesAttendancePKId employeesAttendancePKId);
}
