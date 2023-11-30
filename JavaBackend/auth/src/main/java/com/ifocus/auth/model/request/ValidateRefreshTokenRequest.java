package com.ifocus.auth.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ValidateRefreshTokenRequest {

    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;
}
