package com.ifocus.auth.model.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginUserResponse {

    private String employeeId;
    private String employeeName;
    private String userName;
    private String emailId;
    private String type;
    private String accessToken;
    private String refreshToken;
    private String firstTimeLogin;
    private List<String> rolesList;
}
