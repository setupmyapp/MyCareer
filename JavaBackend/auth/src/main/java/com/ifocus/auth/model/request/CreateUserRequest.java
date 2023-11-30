package com.ifocus.auth.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CreateUserRequest {

    @NotNull @NotBlank
    private String userName;
    @NotNull @NotBlank
    private String passWrd;
    @NotNull @NotBlank
    private String emailId;
    @NotNull @NotBlank
    private String rollName;
}
