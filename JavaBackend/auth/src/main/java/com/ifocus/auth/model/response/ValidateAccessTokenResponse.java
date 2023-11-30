package com.ifocus.auth.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ValidateAccessTokenResponse {

    private String authHeader;
    private boolean areValid;
    private String message;
}
