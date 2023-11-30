package com.ifocus.tracking.model.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ifocus.tracking.model.db.pkid.EmployeesAttendancePKId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity(name = "EmployeesAttendanceInfo")
@Table(name = "tbl_employeesattendanceinfo")
public class EmployeesAttendanceInfo {

    @EmbeddedId
    private EmployeesAttendancePKId employeesAttendancePKId;
    @MapsId("employeeId")
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "employeeid", referencedColumnName = "employeeid", nullable = false)
    private EmployeeInfo employeeInfo;
    @Column(name = "totaldaysinmonth", nullable = false)
    private float totalDaysInMonth;
    @Column(name = "totalworkabledays", nullable = false)
    private float totalWorkableDays;
    @Column(name = "attendancepresent")
    private String attendancePresent;
    @Column(name = "attendanceabsent")
    private String attendanceAbsent;
    @Column(name = "gazettedholidaystaken")
    private String gazettedHolidaysTaken;
    @Column(name = "restrictedholidaystaken")
    private String restrictedHolidaysTaken;
}
