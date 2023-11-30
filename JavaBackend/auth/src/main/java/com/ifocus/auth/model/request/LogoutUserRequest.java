package com.ifocus.auth.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LogoutUserRequest {

    @NotNull @NotBlank
    private String userId;
    @NotNull @NotBlank
    private String accessToken;
}
