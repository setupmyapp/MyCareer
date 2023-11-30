package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.db.UpSkillsInfo;
import com.ifocus.tracking.model.dto.*;
import com.ifocus.tracking.repo.UpSkillsInfoRepo;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@Service
public class UpSkillsInfoService {

    private final UpSkillsInfoRepo upSkillsInfoRepo;
    private final UpSkillTypesMasterService upSkillTypesMasterService;
    private final EmployeeInfoService employeeInfoService;

    @Autowired
    public UpSkillsInfoService(UpSkillsInfoRepo upSkillsInfoRepo, UpSkillTypesMasterService upSkillTypesMasterService, EmployeeInfoService employeeInfoService) {
        this.upSkillsInfoRepo = upSkillsInfoRepo;
        this.upSkillTypesMasterService = upSkillTypesMasterService;
        this.employeeInfoService = employeeInfoService;
    }

    public UpSkillsInfo createUpSkill(UpSkillDTO upSkillDTO, MultipartFile upSkillFees, MultipartFile upSkillCertificate) throws ParseException, IOException {
        if (upSkillFees != null && !upSkillFees.isEmpty()) {
            upSkillDTO.setFeesReceiptFilePath(FilesStorageService.getInstance().saveEmployeeUpSkillFeesReceipt(upSkillFees, upSkillDTO.getEmployeeId()));
        }
        if (upSkillCertificate != null && !upSkillCertificate.isEmpty()) {
            upSkillDTO.setCertificateFilePath(FilesStorageService.getInstance().saveEmployeeUpSkillCertificate(upSkillCertificate, upSkillDTO.getEmployeeId()));
        }
        return mapUpSkillDTO2UpSkillsInfo(upSkillDTO, null);
    }

    public UpSkillsInfo editUpSkill(UpSkillDTO upSkillDTO, MultipartFile upSkillFees, MultipartFile upSkillCertificate) throws ParseException, IOException {
        if (upSkillFees != null && !upSkillFees.isEmpty()) {
            upSkillDTO.setFeesReceiptFilePath(FilesStorageService.getInstance().saveEmployeeUpSkillFeesReceipt(upSkillFees, upSkillDTO.getEmployeeId()));
        }
        if (upSkillCertificate != null && !upSkillCertificate.isEmpty()) {
            upSkillDTO.setCertificateFilePath(FilesStorageService.getInstance().saveEmployeeUpSkillCertificate(upSkillCertificate, upSkillDTO.getEmployeeId()));
        }
        return mapUpSkillDTO2UpSkillsInfo(upSkillDTO, findByUpSkillId(Integer.parseInt(upSkillDTO.getUpSkillId())));
    }

    public UpSkillDTO getUpskill(UpSkillsInfo upSkillsInfo) {
        return mapUpSkillsInfo2UpSkillDTO(upSkillsInfo, null);
    }

    public UpSkillsListDTO getUpskills(UpSkillsInfo upSkillsInfo) {
        return mapUpSkillsInfo2UpSkillsListDTO(upSkillsInfo, null);
    }

    private UpSkillsInfo mapUpSkillDTO2UpSkillsInfo(UpSkillDTO sourceUpSkillDTO, UpSkillsInfo targetUpSkillsInfo) throws ParseException {
        if (targetUpSkillsInfo == null) {
            targetUpSkillsInfo = new UpSkillsInfo();
            targetUpSkillsInfo.setEmployeeInfo(employeeInfoService.findByEmployeeId(sourceUpSkillDTO.getEmployeeId()));
        }
        if (sourceUpSkillDTO.getCourseName() != null && !sourceUpSkillDTO.getCourseName().isEmpty())
            targetUpSkillsInfo.setCourseName(sourceUpSkillDTO.getCourseName());
        if (sourceUpSkillDTO.getUpSkillTypeName() != null && !sourceUpSkillDTO.getUpSkillTypeName().isEmpty())
            targetUpSkillsInfo.setUpSkillTypesMaster(upSkillTypesMasterService.findByUpSkillTypeName(sourceUpSkillDTO.getUpSkillTypeName()));
        if (sourceUpSkillDTO.getTargetSkillSet() != null && !sourceUpSkillDTO.getTargetSkillSet().isEmpty())
            targetUpSkillsInfo.setTargetSkillSet(sourceUpSkillDTO.getTargetSkillSet());
        if (sourceUpSkillDTO.getStartDate() != null && !sourceUpSkillDTO.getStartDate().isEmpty())
            targetUpSkillsInfo.setStartDate(CustomUtil.getGenericDateFormat().parse(sourceUpSkillDTO.getStartDate()));
        if (sourceUpSkillDTO.getEndDate() != null && !sourceUpSkillDTO.getEndDate().isEmpty())
            targetUpSkillsInfo.setEndDate(CustomUtil.getGenericDateFormat().parse(sourceUpSkillDTO.getEndDate()));
        if (sourceUpSkillDTO.getFees() != null && !sourceUpSkillDTO.getFees().isEmpty())
            targetUpSkillsInfo.setFees(Double.parseDouble(sourceUpSkillDTO.getFees()));
        if (sourceUpSkillDTO.getFeesReceiptFilePath() != null && !sourceUpSkillDTO.getFeesReceiptFilePath().isEmpty())
            targetUpSkillsInfo.setFeesReceiptFilePath(sourceUpSkillDTO.getFeesReceiptFilePath());
        if (sourceUpSkillDTO.getCertificateFilePath() != null && !sourceUpSkillDTO.getCertificateFilePath().isEmpty())
            targetUpSkillsInfo.setCertificateFilePath(sourceUpSkillDTO.getCertificateFilePath());
        if (sourceUpSkillDTO.getHasHRVerified() != null && !sourceUpSkillDTO.getHasHRVerified().isEmpty())
            targetUpSkillsInfo.setHasHRVerified(Boolean.parseBoolean(sourceUpSkillDTO.getHasHRVerified()));
        if (sourceUpSkillDTO.getHasHRApprovedFees() != null && !sourceUpSkillDTO.getHasHRApprovedFees().isEmpty())
            targetUpSkillsInfo.setHasHRApprovedFees(Boolean.parseBoolean(sourceUpSkillDTO.getHasHRApprovedFees()));

        return targetUpSkillsInfo;
    }

    private UpSkillDTO mapUpSkillsInfo2UpSkillDTO(UpSkillsInfo sourceUpSkillsInfo, UpSkillDTO targetUpSkillDTO) {
        if (targetUpSkillDTO == null)
            targetUpSkillDTO = new UpSkillDTO();
        targetUpSkillDTO.setUpSkillId(String.valueOf(sourceUpSkillsInfo.getUpSkillId()));
        targetUpSkillDTO.setCourseName(sourceUpSkillsInfo.getCourseName());
        targetUpSkillDTO.setUpSkillTypeName(sourceUpSkillsInfo.getUpSkillTypesMaster().getUpSkillTypeName());
        targetUpSkillDTO.setEmployeeId(sourceUpSkillsInfo.getEmployeeInfo().getEmployeeId());
        targetUpSkillDTO.setEmployeeName(sourceUpSkillsInfo.getEmployeeInfo().getFirstName() + " " + sourceUpSkillsInfo.getEmployeeInfo().getLastName());
        targetUpSkillDTO.setTargetSkillSet(sourceUpSkillsInfo.getTargetSkillSet());
        targetUpSkillDTO.setStartDate(CustomUtil.getGenericDateFormat().format(sourceUpSkillsInfo.getStartDate()));
        targetUpSkillDTO.setEndDate(CustomUtil.getGenericDateFormat().format(sourceUpSkillsInfo.getEndDate()));
        if (sourceUpSkillsInfo.getFees() != 0.0d)
            targetUpSkillDTO.setFees(String.valueOf(sourceUpSkillsInfo.getFees()));
        targetUpSkillDTO.setFeesReceiptFilePath(sourceUpSkillsInfo.getFeesReceiptFilePath());
        if (sourceUpSkillsInfo.getCertificateFilePath() != null && !sourceUpSkillsInfo.getCertificateFilePath().isEmpty())
            targetUpSkillDTO.setCertificateFilePath(sourceUpSkillsInfo.getCertificateFilePath());
        targetUpSkillDTO.setHasHRVerified(String.valueOf(sourceUpSkillsInfo.isHasHRVerified()));
        targetUpSkillDTO.setHasHRApprovedFees(String.valueOf(sourceUpSkillsInfo.isHasHRApprovedFees()));

        return targetUpSkillDTO;
    }

    private UpSkillsListDTO mapUpSkillsInfo2UpSkillsListDTO(UpSkillsInfo sourceUpSkillsInfo, UpSkillsListDTO targetUpSkillsListDTO) {
        if (targetUpSkillsListDTO == null)
            targetUpSkillsListDTO = new UpSkillsListDTO();
        targetUpSkillsListDTO.setUpSkillId(String.valueOf(sourceUpSkillsInfo.getUpSkillId()));
        targetUpSkillsListDTO.setCourseName(sourceUpSkillsInfo.getCourseName());
        targetUpSkillsListDTO.setEmployeeId(sourceUpSkillsInfo.getEmployeeInfo().getEmployeeId());
        targetUpSkillsListDTO.setEmployeeName(sourceUpSkillsInfo.getEmployeeInfo().getFirstName() + " " + sourceUpSkillsInfo.getEmployeeInfo().getLastName());
        targetUpSkillsListDTO.setHasHRVerified(String.valueOf(sourceUpSkillsInfo.isHasHRVerified()));

        return targetUpSkillsListDTO;
    }

    public List<UpSkillsInfo> findByEmployeeInfo(EmployeeInfo employeeInfo) {
        return upSkillsInfoRepo.findByEmployeeInfo(employeeInfo);
    }

    public List<UpSkillsInfo> findAllUpSkill() {
        return upSkillsInfoRepo.findAll();
    }

    public UpSkillsInfo findByUpSkillId(int upSkillId) {
        return upSkillsInfoRepo.findByUpSkillId(upSkillId);
    }

    public UpSkillsInfo saveUpSkill(UpSkillsInfo upSkillsInfo) {
        return upSkillsInfoRepo.save(upSkillsInfo);
    }

}
