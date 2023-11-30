package com.ifocus.tracking.controller;

import com.ifocus.tracking.controller.service.HRSupportEndPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/tracking/hrSupport")
public class HRSupportEndPoint {

    private final HRSupportEndPointService hrSupportEndPointService;

    @Autowired
    public HRSupportEndPoint(HRSupportEndPointService hrSupportEndPointService) {
        this.hrSupportEndPointService = hrSupportEndPointService;
    }

    @PostMapping("/addNewEmployee")
    public ResponseEntity<?> addNewEmployeeRequest(@RequestParam(value ="addNewEmployeeRequest") @Valid @NotNull @NotBlank String addNewEmployeeRequest, @RequestParam(value ="employeeDPFile", required = false) @Valid MultipartFile employeeDPFile){
        return hrSupportEndPointService.addNewEmployee(addNewEmployeeRequest, employeeDPFile);
    }

    @PostMapping("/importNewEmployees")
    public ResponseEntity<?> importNewEmployeesRequest(@RequestParam(value ="newEmployeesFile") @Valid @NotNull @NotBlank MultipartFile newEmployeesFile){
        return hrSupportEndPointService.importNewEmployees(newEmployeesFile);
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<?> getAllEmployeesRequest(){
        return hrSupportEndPointService.getAllEmployees();
    }

    @GetMapping("/getEmployeeProfileDetails/{employeeId}")
    public ResponseEntity<?> getEmployeeProfileDetailsRequest(@PathVariable("employeeId") @NotBlank @NotNull String employeeId){
        return hrSupportEndPointService.getEmployeeProfileDetails(employeeId);
    }

    @PutMapping("/editEmployeeProfileDetails")
    public ResponseEntity<?> editEmployeeProfileDetailsRequest(@RequestParam(value ="editEmployeeProfileDetailsRequest") @Valid @NotNull @NotBlank String editEmployeeProfileDetailsRequest, @RequestParam(value ="employeeDPFile", required = false) @Valid MultipartFile employeeDPFile){
        return hrSupportEndPointService.editEmployeeProfileDetails(editEmployeeProfileDetailsRequest, employeeDPFile);
    }

    @GetMapping("/getAllUpskills")
    public ResponseEntity<?> getAllUpskillsRequest(){
        return hrSupportEndPointService.getAllUpSkills();
    }

    @GetMapping("/getUpskill/{upSkillId}")
    public ResponseEntity<?> getUpskillRequest(@PathVariable("upSkillId") @NotBlank @NotNull int upSkillId) {
        return hrSupportEndPointService.getUpSkill(upSkillId);
    }

    @PutMapping("/editUpSkill")
    public ResponseEntity<?> editUpSkillRequest(@RequestParam(value = "editUpSkillRequest") @Valid @NotNull @NotBlank String editUpSkillRequest, @RequestParam(value = "upskillCertificate", required = false) @Valid @NotNull @NotBlank MultipartFile upskillCertificate, @RequestParam(value = "upskillFees", required = false) @Valid MultipartFile upskillFees){
        return hrSupportEndPointService.editUpSkill(editUpSkillRequest, upskillCertificate,upskillFees);
    }

    @GetMapping("/getAllRMFeedBacksList")
    public ResponseEntity<?> getAllRMFeedBacksListRequest(){
        return hrSupportEndPointService.getAllRMFeedBacksList();
    }

    @GetMapping("/getRMFeedBack/{rmFeedbackId}")
    public ResponseEntity<?> getRMFeedBackRequest(@PathVariable("upSkillId") @NotBlank @NotNull int rmFeedbackId){
        return hrSupportEndPointService.getRMFeedBack(rmFeedbackId);
    }

    @PutMapping("/editRMFeedBack")
    public ResponseEntity<?> editRMFeedBackRequest(@RequestParam(value = "editRMFeedBackRequest") @Valid @NotNull @NotBlank String editRMFeedBackRequest){
        return hrSupportEndPointService.editRMFeedBack(editRMFeedBackRequest);
    }

    @GetMapping("/getAllSelfAppraisalsList")
    public ResponseEntity<?> getAllSelfAppraisalsListRequest(){
        return hrSupportEndPointService.getAllSelfAppraisalsList();
    }

    @GetMapping("/getSelfAppraisal/{selfAppraisalId}")
    public ResponseEntity<?> getSelfAppraisalRequest(@PathVariable("selfAppraisalId") @NotBlank @NotNull int selfAppraisalId){
        return hrSupportEndPointService.getSelfAppraisal(selfAppraisalId);
    }

    @PutMapping("/editSelfAppraisal")
    public ResponseEntity<?> editSelfAppraisalRequest(@RequestParam(value = "editSelfAppraisalRequest") @Valid @NotNull @NotBlank String editSelfAppraisalRequest){
        return hrSupportEndPointService.editSelfAppraisal(editSelfAppraisalRequest);
    }
}
