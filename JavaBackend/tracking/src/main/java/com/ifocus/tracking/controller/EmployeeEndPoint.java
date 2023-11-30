package com.ifocus.tracking.controller;

import com.ifocus.tracking.controller.service.EmployeeEndPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/tracking/employee")
public class EmployeeEndPoint {

    private final EmployeeEndPointService employeeEndPointService;

    @Autowired
    public EmployeeEndPoint(EmployeeEndPointService employeeEndPointService) {
        this.employeeEndPointService = employeeEndPointService;
    }

    @GetMapping("/getMyProfileDetails/{employeeId}")
    public ResponseEntity<?> getMyProfileDetailsRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId) {
        return employeeEndPointService.getMyProfileDetails(employeeId);
    }

    @PutMapping("/editMyProfileDetails")
    public ResponseEntity<?> editMyProfileDetailsRequest(@RequestParam(value = "editMyProfileDetailsRequest") @Valid @NotNull @NotBlank String editMyProfileDetailsRequest, @RequestParam(value = "employeeDPFile", required = false) @Valid MultipartFile employeeDPFile) {
        return employeeEndPointService.editMyProfileDetails(editMyProfileDetailsRequest, employeeDPFile);
    }

    @PostMapping("/addNewUpSkill")
    public ResponseEntity<?> addNewUpSkillRequest(@RequestParam(value = "addNewUpSkillRequest") @Valid @NotNull @NotBlank String addNewUpSkillRequest, @RequestParam(value = "upskillCertificate") @Valid @NotNull @NotBlank MultipartFile upskillCertificate, @RequestParam(value = "upskillFees", required = false) @Valid MultipartFile upskillFees){
        return employeeEndPointService.addNewUpSkill(addNewUpSkillRequest, upskillCertificate, upskillFees);
    }

    @GetMapping("/getMyUpSkillsList/{employeeId}")
    public ResponseEntity<?> getMyUpSkillsListRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId) {
        return employeeEndPointService.getMyUpSkillsList(employeeId);
    }

    @GetMapping("/getMyUpskill/{upSkillId}")
    public ResponseEntity<?> getMyUpSkillRequest(@PathVariable("upSkillId") @NotBlank @NotNull int upSkillId) {
        return employeeEndPointService.getMyUpSkill(upSkillId);
    }

    @PutMapping("/editMyUpSkill")
    public ResponseEntity<?> editMyUpSkillRequest(@RequestParam(value = "editMyUpSkillRequest") @Valid @NotNull @NotBlank String editMyUpSkillRequest, @RequestParam(value = "upskillCertificate", required = false) @Valid @NotNull @NotBlank MultipartFile upskillCertificate, @RequestParam(value = "upskillFees", required = false) @Valid MultipartFile upskillFees){
        return employeeEndPointService.editUpSkill(editMyUpSkillRequest, upskillCertificate, upskillFees);
    }

    @GetMapping("/getMyRMFeedBacksList/{employeeId}")
    public ResponseEntity<?> getMyRMFeedBacksListRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return employeeEndPointService.getMyRMFeedBacksList(employeeId);
    }

    @GetMapping("/getMyRMFeedBack/{rmFeedbackId}")
    public ResponseEntity<?> getMyRMFeedBackRequest(@PathVariable("rmFeedbackId") @NotBlank @NotNull int rmFeedbackId){
        return employeeEndPointService.getMyRMFeedBack(rmFeedbackId);
    }

    @PostMapping("/addNewMySelfAppraisal")
    public ResponseEntity<?> addNewMySelfAppraisalRequest(@RequestParam(value = "addNewMySelfAppraisalRequest") @Valid @NotNull @NotBlank String addNewMySelfAppraisalRequest){
        return employeeEndPointService.addNewMySelfAppraisal(addNewMySelfAppraisalRequest);
    }

    @GetMapping("/getMySelfAppraisalsList/{employeeId}")
    public ResponseEntity<?> getMySelfAppraisalsListRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return employeeEndPointService.getMySelfAppraisalsList(employeeId);
    }

    @GetMapping("/getMySelfAppraisal/{selfAppraisalId}")
    public ResponseEntity<?> getMySelfAppraisalRequest(@PathVariable("selfAppraisalId") @NotBlank @NotNull int selfAppraisalId){
        return employeeEndPointService.getMySelfAppraisal(selfAppraisalId);
    }

    @PutMapping("/editMySelfAppraisal")
    public ResponseEntity<?> editMySelfAppraisalRequest(@RequestParam(value = "editMySelfAppraisalRequest") @Valid @NotNull @NotBlank String editMySelfAppraisalRequest){
        return employeeEndPointService.editMySelfAppraisal(editMySelfAppraisalRequest);
    }
}
