package com.ifocus.tracking.model.responses;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AMEmailCredentialsResponse {

    private String employeeId;
    private String emailAM;
    private String passwrdAM;
    private boolean areSuccessful;
    private String message;
}
