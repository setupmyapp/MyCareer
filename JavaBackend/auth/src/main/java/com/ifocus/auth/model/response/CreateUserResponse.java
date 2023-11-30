package com.ifocus.auth.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateUserResponse {

    private String userId;
    private String userName;
    private boolean areSuccessful;
    private String message;
}
