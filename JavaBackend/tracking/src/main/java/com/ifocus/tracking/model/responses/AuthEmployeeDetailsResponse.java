package com.ifocus.tracking.model.responses;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthEmployeeDetailsResponse {

    private String employeeId;
    private String employeeName;
    private String userId;
    private boolean areSuccessful;
    private String message;
}
