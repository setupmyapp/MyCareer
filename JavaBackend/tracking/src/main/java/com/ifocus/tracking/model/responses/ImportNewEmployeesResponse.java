package com.ifocus.tracking.model.responses;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportNewEmployeesResponse {
    private String fileName;
    private boolean areSuccessful;
    private String message;
}
