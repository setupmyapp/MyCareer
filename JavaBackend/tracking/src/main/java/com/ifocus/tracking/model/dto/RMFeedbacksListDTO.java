package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RMFeedbacksListDTO {

    private String rmFeedbackId;
    private String employeeId;
    private String employeeName;
    private String rmName;
    private String businessUnit;
    private String rmFeedbackDate;
    private String averageRating;
}
