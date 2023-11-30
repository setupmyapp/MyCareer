package com.ifocus.tracking.controller;


import com.ifocus.tracking.controller.service.AccountManagerEndPointService;
import com.ifocus.tracking.model.requests.AMEmailCredentialsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/tracking/accountManager")
public class AccountManagerEndPoint {

    private final AccountManagerEndPointService accountManagerEndPointService;

    @Autowired
    public AccountManagerEndPoint(AccountManagerEndPointService accountManagerEndPointService) {
        this.accountManagerEndPointService = accountManagerEndPointService;
    }

    /*@PostMapping("/sendEmailToRM"){

    }*/

    @GetMapping("/getMyAMEmailCredentials/{employeeId}")
    public ResponseEntity<?> getMyAMEmailCredentialsRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return accountManagerEndPointService.getMyAMEmailCredentials(employeeId);
    }

    @PostMapping("/addAMEmailCredentials")
    public ResponseEntity<?> addAMEmailCredentialsRequest(@Param(value = "Account Manager Credentials") @Valid @RequestBody AMEmailCredentialsRequest amEmailCredentialsRequest){
        return accountManagerEndPointService.addAMEmailCredentials(amEmailCredentialsRequest);
    }

    @GetMapping("/getAllMyTeamMembers/{employeeId}")
    public ResponseEntity<?> getAllMyTeamMembersRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return accountManagerEndPointService.getAllMyTeamMembers(employeeId);
    }

    @GetMapping("/getTeamMemberProfileDetails/{employeeId}")
    public ResponseEntity<?> getTeamMemberProfileDetailsRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return accountManagerEndPointService.getTeamMemberProfileDetails(employeeId);
    }
}
