package com.ifocus.tracking.model.requests;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateUserRequest {

    @NotNull
    @NotBlank
    private String userName;
    @NotNull
    @NotBlank
    private String passWrd;
    @NotNull
    @NotBlank
    private String emailId;
    @NotNull
    @NotBlank
    private String rollName;
}
