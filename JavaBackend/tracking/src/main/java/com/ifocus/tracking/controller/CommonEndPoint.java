package com.ifocus.tracking.controller;

import com.ifocus.tracking.controller.service.CommonEndPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/tracking/common")
public class CommonEndPoint {

    private final CommonEndPointService commonEndPointService;

    @Autowired
    public CommonEndPoint(CommonEndPointService commonEndPointService) {
        this.commonEndPointService = commonEndPointService;
    }

    @GetMapping("/getAllBands")
    public ResponseEntity<?> getAllBandsRequest(){
        return commonEndPointService.getAllBands();
    }

    @GetMapping("/getAllCostCenters")
    public ResponseEntity<?> getAllCostCentersRequest(){
        return commonEndPointService.getAllCostCenters();
    }

    @GetMapping("/getAllRatings")
    public ResponseEntity<?> getAllRatingsRequest(){
        return commonEndPointService.getAllRatings();
    }

    @GetMapping("/getAllDepartments")
    public ResponseEntity<?> getAllDepartmentsRequest(){
        return commonEndPointService.getAllDepartments();
    }

    @GetMapping("/getAllUpSkillTypes")
    public ResponseEntity<?> getAllUpSkillTypesRequest(){
        return commonEndPointService.getAllUpSkillTypes();
    }

    @GetMapping("/getAllKPIs")
    public ResponseEntity<?> getAllKPIsRequest(){
        return commonEndPointService.getAllKPIs();
    }

    @GetMapping("/getAllHolidaysForYear/{year}")
    public ResponseEntity<?> getAllHolidaysForYearRequest(@PathVariable("employeeId") @NotBlank @NotNull String year){
        return commonEndPointService.getAllHolidaysForYear(year);
    }

    @GetMapping("/getEmployeeDetails/{userId}")
    public ResponseEntity<?> getEmployeeIdRequest(@PathVariable("userId") @NotBlank @NotNull int userId){
        return commonEndPointService.getEmployeeDetails(userId);
    }
}
