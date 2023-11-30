package com.ifocus.tracking.model.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportNewEmployeesRequest {

    private String fileName;
    private String fileType;
}
