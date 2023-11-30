package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class EmployeesAttendanceListDTO {

    private String employeeId;
    private String employeeName;
    private String year;
    private String month;
}
