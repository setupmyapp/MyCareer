package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UpSkillsListDTO {

    private String upSkillId;
    private String courseName;
    private String employeeId;
    private String employeeName;
    private String hasHRVerified;
}
