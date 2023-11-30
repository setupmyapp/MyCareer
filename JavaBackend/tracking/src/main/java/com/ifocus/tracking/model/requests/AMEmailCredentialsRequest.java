package com.ifocus.tracking.model.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AMEmailCredentialsRequest {

    @NotNull
    @NotBlank
    private String employeeId;
    @NotNull
    @NotBlank
    private String emailId;
    @NotNull
    @NotBlank
    private String passWrd;
}
