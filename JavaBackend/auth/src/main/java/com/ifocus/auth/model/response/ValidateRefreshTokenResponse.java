package com.ifocus.auth.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ValidateRefreshTokenResponse {

    private String accessToken;
    private String refreshToken;
    private boolean areSuccessful;
    private String message;
}
