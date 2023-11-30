package com.ifocus.tracking.model.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class EmployeeDTO {

    @NotNull @NotBlank
    private String employeeId;
    private String userId;
    @NotNull @NotBlank
    private String firstName;
    private String middleName;
    @NotNull @NotBlank
    private String lastName;
    @NotNull @NotBlank
    private String emailId;
    @NotNull @NotBlank
    private String contactNo;
    private String birthDate;
    private String dpFilePath;
    private String designation;
    private String experienceWhenJoined;
    private String experienceBySkills;
    private String joiningDate;
    private String lastWorkingDate;
    private String totalExperience;
    private String previousAppraisalDate;
    private String appraisalDueDate;
    private String bandGrade;
    private String costCenterName;
    private String departmentName;
    private String nameRM;
    private String emailRM;
    private String contactRM;
    @NotNull @NotBlank
    private String areAM;
    private String emailAM;
    private String passwrdAM;
    private String tMUnderAM;
    private String underAM;
    private String hasHRApproved;
    private String areBillable;
    private String kpiDetails;
}
