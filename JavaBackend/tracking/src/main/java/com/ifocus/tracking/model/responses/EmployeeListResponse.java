package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.EmployeesListDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeListResponse {

    private List<EmployeesListDTO> employeesListDTOList;
    private boolean areSuccessful;
    private String message;
}
