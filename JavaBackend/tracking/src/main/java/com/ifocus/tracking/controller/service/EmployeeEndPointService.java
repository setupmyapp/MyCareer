package com.ifocus.tracking.controller.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.db.RMFeedbacksInfo;
import com.ifocus.tracking.model.db.SelfAppraisalsInfo;
import com.ifocus.tracking.model.db.UpSkillsInfo;
import com.ifocus.tracking.model.dto.*;
import com.ifocus.tracking.model.responses.*;
import com.ifocus.tracking.service.EmployeeInfoService;
import com.ifocus.tracking.service.RMFeedbacksInfoService;
import com.ifocus.tracking.service.SelfAppraisalsInfoService;
import com.ifocus.tracking.service.UpSkillsInfoService;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeEndPointService {

    private final EmployeeInfoService employeeInfoService;
    private final UpSkillsInfoService upSkillsInfoService;
    private final SelfAppraisalsInfoService selfAppraisalsInfoService;
    private final RMFeedbacksInfoService rmFeedbacksInfoService;

    @Autowired
    public EmployeeEndPointService(EmployeeInfoService employeeInfoService, UpSkillsInfoService upSkillsInfoService, SelfAppraisalsInfoService selfAppraisalsInfoService, RMFeedbacksInfoService rmFeedbacksInfoService) {
        this.employeeInfoService = employeeInfoService;
        this.upSkillsInfoService = upSkillsInfoService;
        this.selfAppraisalsInfoService = selfAppraisalsInfoService;
        this.rmFeedbacksInfoService = rmFeedbacksInfoService;
    }

    public ResponseEntity<?> getMyProfileDetails(String employeeId) {
        EmployeeInfo employeeInfo = employeeInfoService.findByEmployeeId(employeeId);
        if (employeeInfo != null) {
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Profile Details!!!"));
        } else {
            return ResponseEntity.badRequest().body(new EmployeeResponse(null, "", false, "Employee Not Present"));
        }
    }

    public ResponseEntity<?> editMyProfileDetails(String editMyProfileDetailsRequest, MultipartFile employeeDPFile) {
        EmployeeDTO employeeDTO = null;
        try {
            employeeDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editMyProfileDetailsRequest, EmployeeDTO.class);
            EmployeeInfo employeeInfo = employeeInfoService.saveEmployee(employeeInfoService.editEmployee(employeeDTO, employeeDPFile));
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Edited Successfully!!!"));
        } catch (Exception ex) {
            return ResponseEntity.ok().body(new EmployeeResponse(null, "", false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> addNewUpSkill(String addNewUpSkillRequest, MultipartFile upskillCertificate, MultipartFile upskillFees) {
        UpSkillDTO upSkillDTO = null;
        try {
            upSkillDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(addNewUpSkillRequest, UpSkillDTO.class);
            UpSkillsInfo upSkillsInfo = upSkillsInfoService.saveUpSkill(upSkillsInfoService.createUpSkill(upSkillDTO, upskillFees, upskillCertificate));
            return ResponseEntity.ok().body(new UpSkillResponse(upSkillsInfoService.getUpskill(upSkillsInfo), true, "New UpSkill Added!!!"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getMyUpSkillsList(String employeeId) {
        List<UpSkillsInfo> upskillsInfoList = employeeInfoService.findByEmployeeId(employeeId).getUpSkillsInfoList();
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

    public ResponseEntity<?> getMyUpSkill(int upSkillId) {
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

    public ResponseEntity<?> getMyRMFeedBacksList(String employeeId) {
        List<RMFeedbacksInfo> rmFeedbacksInfoList = employeeInfoService.findByEmployeeId(employeeId).getRmFeedbacksInfoList();
        if (rmFeedbacksInfoList != null && !rmFeedbacksInfoList.isEmpty()) {
            List<RMFeedbacksListDTO> rmFeedbacksListDTOList = new ArrayList<>();
            for (RMFeedbacksInfo rmFeedbacksInfo : rmFeedbacksInfoList) {
                rmFeedbacksListDTOList.add(rmFeedbacksInfoService.getRMFeedbacks(rmFeedbacksInfo));
            }
            return ResponseEntity.ok().body(new RMFeedbacksListResponse(rmFeedbacksListDTOList, true, "All Feedback List!!!"));
        }else{
            return ResponseEntity.badRequest().body(new RMFeedbacksListResponse(null, false, "No Feedback Present!!!"));
        }
    }

    public ResponseEntity<?> getMyRMFeedBack(int rmFeedbackId) {
        RMFeedbacksInfo rmFeedbacksInfo = rmFeedbacksInfoService.findByrmFeedbackId(rmFeedbackId);
        if (rmFeedbacksInfo != null) {
            return ResponseEntity.ok().body((new RMFeedbackResponse(rmFeedbacksInfoService.getRMFeedback(rmFeedbacksInfo), true, "Feedback!!!")));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, "No Feedback Present!!!"));
        }
    }

    public ResponseEntity<?> addNewMySelfAppraisal(String addNewMySelfAppraisalRequest) {
        SelfAppraisalDTO selfAppraisalDTO = null;
        try {
            selfAppraisalDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(addNewMySelfAppraisalRequest, SelfAppraisalDTO.class);
            SelfAppraisalsInfo selfAppraisalsInfo = selfAppraisalsInfoService.saveSelfAppraisal(selfAppraisalsInfoService.createSelfAppraisal(selfAppraisalDTO));
            return ResponseEntity.ok().body(new SelfAppraisalResponse(selfAppraisalsInfoService.getSelfAppraisal(selfAppraisalsInfo), true, "New SelfAppraisal Added!!!"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new SelfAppraisalResponse(null, false, ex.getMessage()));
        }
    }

    public ResponseEntity<?> getMySelfAppraisalsList(String employeeId){
        List<SelfAppraisalsInfo> selfAppraisalsInfoList = employeeInfoService.findByEmployeeId(employeeId).getSelfAppraisalsInfoList();
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

    public ResponseEntity<?> getMySelfAppraisal(int selfAppraisalId) {
        SelfAppraisalsInfo selfAppraisalsInfo = selfAppraisalsInfoService.findBySelfAppraisalId(selfAppraisalId);
        if (selfAppraisalsInfo != null) {
            return ResponseEntity.ok().body((new SelfAppraisalResponse(selfAppraisalsInfoService.getSelfAppraisal(selfAppraisalsInfo), true, "SelfAppraisal!!!")));
        } else {
            return ResponseEntity.badRequest().body(new UpSkillResponse(null, false, "No SelfAppraisal Present!!!"));
        }
    }

    public ResponseEntity<?> editMySelfAppraisal(String editMySelfAppraisalRequest){
        SelfAppraisalDTO selfAppraisalDTO = null;
        try {
            selfAppraisalDTO = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(editMySelfAppraisalRequest, SelfAppraisalDTO.class);
            SelfAppraisalsInfo selfAppraisalsInfo = selfAppraisalsInfoService.saveSelfAppraisal(selfAppraisalsInfoService.editSelfAppraisal(selfAppraisalDTO));
            return ResponseEntity.ok().body(new SelfAppraisalResponse(selfAppraisalsInfoService.getSelfAppraisal(selfAppraisalsInfo), true, "SelfAppraisal Modified!!!"));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new SelfAppraisalResponse(null, false, ex.getMessage()));
        }
    }
}
