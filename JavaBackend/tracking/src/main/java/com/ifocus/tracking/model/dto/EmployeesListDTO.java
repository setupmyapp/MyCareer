package com.ifocus.tracking.model.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeesListDTO {

    @NotNull @NotBlank
    private String employeeId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String contactNo;
    private String areAM;
    private String hasHRApproved;
    private String areBillable;
}
