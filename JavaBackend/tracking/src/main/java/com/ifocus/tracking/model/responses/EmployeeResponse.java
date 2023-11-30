package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {

    private EmployeeDTO employeeDTO;
    private String dpFile;
    private boolean areSuccessful;
    private String message;
}
