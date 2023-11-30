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
public class UpSkillDTO {

    private String upSkillId;
    private String courseName;
    private String upSkillTypeName;
    @NotNull @NotBlank
    private String employeeId;
    private String employeeName;
    private String targetSkillSet;
    private String startDate;
    private String endDate;
    private String fees;
    private String feesReceiptFilePath;
    private String certificateFilePath;
    private String hasHRVerified;
    private String hasHRApprovedFees;
}
