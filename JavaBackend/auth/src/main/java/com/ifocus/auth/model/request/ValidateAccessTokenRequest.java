package com.ifocus.auth.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
@Getter
@Setter
public class ValidateAccessTokenRequest {

    @NotBlank
    private String authHeader;
}
