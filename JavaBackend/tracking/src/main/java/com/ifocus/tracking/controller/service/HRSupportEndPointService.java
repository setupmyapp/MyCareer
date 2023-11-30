package com.ifocus.tracking.controller.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.db.RMFeedbacksInfo;
import com.ifocus.tracking.model.db.SelfAppraisalsInfo;
import com.ifocus.tracking.model.db.UpSkillsInfo;
import com.ifocus.tracking.model.dto.*;
import com.ifocus.tracking.model.enums.Roles;
import com.ifocus.tracking.model.requests.CreateUserRequest;
import com.ifocus.tracking.model.responses.*;
import com.ifocus.tracking.service.*;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class HRSupportEndPointService {

    private final EmployeeInfoService employeeInfoService;
    private final UpSkillsInfoService upSkillsInfoService;
    private final RMFeedbacksInfoService rmFeedbacksInfoService;
    private final SelfAppraisalsInfoService selfAppraisalsInfoService;
    private final EmployeesAttendanceInfoService employeesAttendanceInfoService;
    private final RestTemplate restTemplate;
    private final ExcelService excelService;

    @Autowired
    public HRSupportEndPointService(EmployeeInfoService employeeInfoService, UpSkillsInfoService upSkillsInfoService, RMFeedbacksInfoService rmFeedbacksInfoService, SelfAppraisalsInfoService selfAppraisalsInfoService, EmployeesAttendanceInfoService employeeAttendanceInfoService, RestTemplate restTemplate, ExcelService excelService) {
        this.employeeInfoService = employeeInfoService;
        this.upSkillsInfoService = upSkillsInfoService;
        this.rmFeedbacksInfoService = rmFeedbacksInfoService;
        this.selfAppraisalsInfoService = selfAppraisalsInfoService;
        this.employeesAttendanceInfoService = employeeAttendanceInfoService;
        this.restTemplate = restTemplate;
        this.excelService = excelService;
    }

    public ResponseEntity<?> addNewEmployee(String addNewEmployeeRequest, MultipartFile employeeDPFile) {
        EmployeeDTO employeeDTO = null;
        try {
            employeeDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(addNewEmployeeRequest, EmployeeDTO.class);
            CreateUserResponse createUserResponse = restTemplate.postForObject("http://AUTHENTICATION-SERVICE/user/NoAuth/createUser", new CreateUserRequest(employeeDTO.getEmailId(), CustomUtil.getDefaultPassword(), employeeDTO.getEmailId(), Boolean.parseBoolean(employeeDTO.getAreAM()) ? Roles.ACCOUNT_MANAGER.name() : Roles.TEAM_MEMBER.name()), CreateUserResponse.class);
            if (!createUserResponse.isAreSuccessful()) {
                throw new RuntimeException(createUserResponse.getMessage());
            }
            EmployeeInfo employeeInfo = employeeInfoService.saveEmployee(employeeInfoService.createEmployee(employeeDTO, createUserResponse.getUserId(), employeeDPFile));
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Added Successfully"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new EmployeeResponse(null, "", false, "Could Not Add Employee:- " + employeeDTO.getEmployeeId() + " due to " + ex.getMessage()));
        }
    }

    public ResponseEntity<?> importNewEmployees(MultipartFile newEmployeesFile) {
        try {
            if (newEmployeesFile != null && !newEmployeesFile.isEmpty() && newEmployeesFile.getOriginalFilename().endsWith(CustomUtil.fileContentTypeXLSX())) {
                List<EmployeeDTO> employeeDTOList = excelService.parseEmployeesExcelFile(newEmployeesFile);
                for (EmployeeDTO employeeDTO : employeeDTOList) {
                    CreateUserResponse createUserResponse = restTemplate.postForObject("http://AUTHENTICATION-SERVICE/user/NoAuth/createUser",
                            new CreateUserRequest(employeeDTO.getEmailId(), CustomUtil.getDefaultPassword(), employeeDTO.getEmailId(), Boolean.parseBoolean(employeeDTO.getAreAM()) ? Roles.ACCOUNT_MANAGER.name() : Roles.TEAM_MEMBER.name()), CreateUserResponse.class);
                    if (!createUserResponse.isAreSuccessful()) {
                        throw new RuntimeException(createUserResponse.getMessage());
                    }
                    employeeInfoService.saveEmployee(employeeInfoService.createEmployee(employeeDTO, createUserResponse.getUserId(), null));
                }
                return ResponseEntity.ok().body(new ImportNewEmployeesResponse(newEmployeesFile.getOriginalFilename(),
                        true, "All the Employees from the XLSX file are imported!"));
            } else {
                return ResponseEntity.badRequest().body(new ImportNewEmployeesResponse(newEmployeesFile.getOriginalFilename(), false, "The Imported file is not CSV!!!"));
            }
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ImportNewEmployeesResponse(newEmployeesFile.getOriginalFilename(), false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getAllEmployees() {
        List<EmployeeInfo> employeeInfoList = employeeInfoService.findAll();
        if (employeeInfoList != null && !employeeInfoList.isEmpty()) {
            List<EmployeesListDTO> employeesListDTOList = new ArrayList<>();
            for (EmployeeInfo employeeInfo : employeeInfoList) {
                employeesListDTOList.add(employeeInfoService.getEmployees(employeeInfo));
            }
            return ResponseEntity.ok().body(new EmployeeListResponse(employeesListDTOList, true, "All Employees"));
        } else {
            return ResponseEntity.badRequest().body(new EmployeeListResponse(null, false, "Employees Not found"));
        }
    }

    public ResponseEntity<?> getEmployeeProfileDetails(String employeeId) {
        EmployeeInfo employeeInfo = employeeInfoService.findByEmployeeId(employeeId);
        if (employeeInfo != null) {
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Profile Details!!!"));
        } else {
            return ResponseEntity.badRequest().body(new EmployeeResponse(null, "", false, "Employee Not Present"));
        }
    }

    public ResponseEntity<?> editEmployeeProfileDetails(String editEmployeeProfileDetails, MultipartFile employeeDPFile) {
        EmployeeDTO employeeDTO = null;
        try {
            employeeDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editEmployeeProfileDetails, EmployeeDTO.class);
            EmployeeInfo employeeInfo = employeeInfoService.saveEmployee(employeeInfoService.editEmployee(employeeDTO, employeeDPFile));
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Edited Successfully!!!"));
        } catch (Exception ex) {
            return ResponseEntity.ok().body(new EmployeeResponse(null, "", false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getAllUpSkills() {
        List<UpSkillsInfo> upskillsInfoList = upSkillsInfoService.findAllUpSkill();
        if (upskillsInfoList != null && !upskillsInfoList.isEmpty()) {
            List<UpSkillsListDTO> upSkillsListDTOList = new ArrayList<>();
            for (UpSkillsInfo upSkillsInfo : upskillsInfoList) {
                upSkillsListDTOList.add(upSkillsInfoService.getUpskills(upSkillsInfo));
            }
            return ResponseEntity.ok().body(new UpSkillsListResponse(upSkillsListDTOList, true, "All UpSkills List!!!"));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillsListResponse(null, false, "No UpSkills List Present!!!"));
        }
    }

    public ResponseEntity<?> getUpSkill(int upSkillId) {
        UpSkillsInfo upskillsInfo = upSkillsInfoService.findByUpSkillId(upSkillId);
        if (upskillsInfo != null) {
            return ResponseEntity.ok().body((new UpSkillResponse(upSkillsInfoService.getUpskill(upskillsInfo), true, "UpSkill!!!")));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, "No UpSkill Present!!!"));
        }
    }

    public ResponseEntity<?> editUpSkill(String editMyUpSkillRequest, MultipartFile upskillCertificate, MultipartFile upskillFees) {
        UpSkillDTO upSkillDTO = null;
        try {
            upSkillDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editMyUpSkillRequest, UpSkillDTO.class);
            UpSkillsInfo upSkillsInfo = upSkillsInfoService.saveUpSkill(upSkillsInfoService.editUpSkill(upSkillDTO, upskillFees, upskillCertificate));
            return ResponseEntity.ok().body(new UpSkillResponse(upSkillsInfoService.getUpskill(upSkillsInfo), true, "UpSKill Modified!!!"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getAllRMFeedBacksList() {
        List<RMFeedbacksInfo> rmFeedbacksInfoList = rmFeedbacksInfoService.findAllRMFeedback();
        if (rmFeedbacksInfoList != null && !rmFeedbacksInfoList.isEmpty()) {
            List<RMFeedbacksListDTO> rmFeedbacksListDTOList = new ArrayList<>();
            for (RMFeedbacksInfo rmFeedbacksInfo : rmFeedbacksInfoList) {
                rmFeedbacksListDTOList.add(rmFeedbacksInfoService.getRMFeedbacks(rmFeedbacksInfo));
            }
            return ResponseEntity.ok().body(new RMFeedbacksListResponse(rmFeedbacksListDTOList, true, "All Feedback List!!!"));
        } else {
            return ResponseEntity.badRequest().body(new RMFeedbacksListResponse(null, false, "No Feedback Present!!!"));
        }
    }

    public ResponseEntity<?> getRMFeedBack(int rmFeedbackId) {
        RMFeedbacksInfo rmFeedbacksInfo = rmFeedbacksInfoService.findByrmFeedbackId(rmFeedbackId);
        if (rmFeedbacksInfo != null) {
            return ResponseEntity.ok().body((new RMFeedbackResponse(rmFeedbacksInfoService.getRMFeedback(rmFeedbacksInfo), true, "Feedback!!!")));
        } else {
            return ResponseEntity.badRequest().body(new RMFeedbackResponse(null, false, "No Feedback Present!!!"));
        }
    }

    public ResponseEntity<?> editRMFeedBack(String editRMFeedBackRequest) {
        RMFeedbackDTO rmFeedbackDTO = null;
        try {
            rmFeedbackDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editRMFeedBackRequest, RMFeedbackDTO.class);
            RMFeedbacksInfo rmFeedbacksInfo = rmFeedbacksInfoService.saveRMFeedback(rmFeedbacksInfoService.editRMFeedback(rmFeedbackDTO));
            return ResponseEntity.ok().body(new RMFeedbackResponse(rmFeedbacksInfoService.getRMFeedback(rmFeedbacksInfo), true, "UpSKill Modified!!!"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new RMFeedbackResponse(null, false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getAllSelfAppraisalsList() {
        List<SelfAppraisalsInfo> selfAppraisalsInfoList = selfAppraisalsInfoService.findAllSelfAppraisals();
        if (selfAppraisalsInfoList != null && !selfAppraisalsInfoList.isEmpty()) {
            List<SelfAppraisalsListDTO> selfAppraisalsListDTOList = new ArrayList<>();
            for (SelfAppraisalsInfo selfAppraisalsInfo : selfAppraisalsInfoList) {
                selfAppraisalsListDTOList.add(selfAppraisalsInfoService.getSelfAppraisals(selfAppraisalsInfo));
            }
            return ResponseEntity.ok().body(new SelfAppraisalsListResponse(selfAppraisalsListDTOList, true, "All SelfAppraisals List!!!"));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillsListResponse(null, false, "No SelfAppraisals List Present!!!"));
        }
    }

    public ResponseEntity<?> getSelfAppraisal(int selfAppraisalId) {
        SelfAppraisalsInfo selfAppraisalsInfo = selfAppraisalsInfoService.findBySelfAppraisalId(selfAppraisalId);
        if (selfAppraisalsInfo != null) {
            return ResponseEntity.ok().body((new SelfAppraisalResponse(selfAppraisalsInfoService.getSelfAppraisal(selfAppraisalsInfo), true, "SelfAppraisal!!!")));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, "No SelfAppraisal Present!!!"));
        }
    }

    public ResponseEntity<?> editSelfAppraisal(String editSelfAppraisalRequest) {
        SelfAppraisalDTO selfAppraisalDTO = null;
        try {
            selfAppraisalDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editSelfAppraisalRequest, SelfAppraisalDTO.class);
            SelfAppraisalsInfo selfAppraisalsInfo = selfAppraisalsInfoService.saveSelfAppraisal(selfAppraisalsInfoService.editSelfAppraisal(selfAppraisalDTO));
            return ResponseEntity.ok().body(new SelfAppraisalResponse(selfAppraisalsInfoService.getSelfAppraisal(selfAppraisalsInfo), true, "SelfAppraisal Modified!!!"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new SelfAppraisalResponse(null, false, ex.getMessage()));
        }
    }
}
