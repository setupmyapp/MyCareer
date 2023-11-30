package com.ifocus.tracking.model.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportEmployeeAttendanceResponse {
    private String fileName;
    private boolean areSuccessful;
    private String message;
}
