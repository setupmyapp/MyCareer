package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class EmployeeAttendanceDTO {

    @NotNull @NotBlank
    private String employeeId;
    private String employeeName;
    private String year;
    private String month;
    private String totalDaysInMonth;
    private String totalWorkableDays;
    private String attendancePresent;
    private String attendanceAbsent;
    private String gazettedHolidaysTaken;
    private String restrictedHolidaysTaken;
}
