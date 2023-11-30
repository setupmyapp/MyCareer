package com.ifocus.auth.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LoginUserRequest {

    @NotNull @NotBlank
    private String userName;
    @NotNull @NotBlank
    private String passWrd;
}
