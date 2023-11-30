package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.RMFeedbacksInfo;
import com.ifocus.tracking.model.dto.RMFeedbackDTO;
import com.ifocus.tracking.model.dto.RMFeedbacksListDTO;
import com.ifocus.tracking.repo.RMFeedbacksInfoRepo;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class RMFeedbacksInfoService {

    private final RMFeedbacksInfoRepo rmFeedbacksInfoRepo;
    private final EmployeeInfoService employeeInfoService;

    @Autowired
    public RMFeedbacksInfoService(RMFeedbacksInfoRepo rmFeedbacksInfoRepo, EmployeeInfoService employeeInfoService) {
        this.rmFeedbacksInfoRepo = rmFeedbacksInfoRepo;
        this.employeeInfoService = employeeInfoService;
    }

    public RMFeedbacksInfo createRMFeedback(RMFeedbackDTO rmFeedbackDTO) throws ParseException {
        return mapRMFeedbackDTO2RMFeedbacksInfo(rmFeedbackDTO, null);
    }

    public RMFeedbacksInfo editRMFeedback(RMFeedbackDTO rmFeedbackDTO) throws ParseException {
        return mapRMFeedbackDTO2RMFeedbacksInfo(rmFeedbackDTO, findByrmFeedbackId(Integer.parseInt(rmFeedbackDTO.getRmFeedbackId())));
    }

    public RMFeedbackDTO getRMFeedback(RMFeedbacksInfo rmFeedbacksInfo) {
        return mapRMFeedbacksInfo2RMFeedbackDTO(rmFeedbacksInfo, null);
    }

    public RMFeedbacksListDTO getRMFeedbacks(RMFeedbacksInfo rmFeedbacksInfo) {
        return mapRMFeedbacksInfo2RMFeedbacksListDTO(rmFeedbacksInfo, null);
    }

    private RMFeedbacksInfo mapRMFeedbackDTO2RMFeedbacksInfo(RMFeedbackDTO sourceRMFeedbackDTO, RMFeedbacksInfo targetRMFeedbacksInfo) throws ParseException {
        /*if (targetRMFeedbacksInfo == null){
            targetRMFeedbacksInfo = new RMFeedbacksInfo();
            targetRMFeedbacksInfo.setEmployeeInfo(employeeInfoService.findByEmployeeId(sourceRMFeedbackDTO.getEmployeeId()));
        }
        if (sourceRMFeedbackDTO.getBusinessUnit() != null && !sourceRMFeedbackDTO.getBusinessUnit().isEmpty())
            targetRMFeedbacksInfo.setBusinessUnit(sourceRMFeedbackDTO.getBusinessUnit());
        if (sourceRMFeedbackDTO.getRmFeedbackDate() != null && !sourceRMFeedbackDTO.getRmFeedbackDate().isEmpty())
            targetRMFeedbacksInfo.setRmFeedbackDate(CustomUtil.getGenericDateFormat().parse(sourceRMFeedbackDTO.getRmFeedbackDate()));
        if (sourceRMFeedbackDTO.getPerformanceRatings() != null && !sourceRMFeedbackDTO.getPerformanceRatings().isEmpty())
            targetRMFeedbacksInfo.setPerformanceRatings(sourceRMFeedbackDTO.getPerformanceRatings());
        if (sourceRMFeedbackDTO.getAverageRating() != null && !sourceRMFeedbackDTO.getAverageRating().isEmpty())
            targetRMFeedbacksInfo.setAverageRating(sourceRMFeedbackDTO.getAverageRating());
        if (sourceRMFeedbackDTO.getCommentStrengths() != null && !sourceRMFeedbackDTO.getCommentStrengths().isEmpty())
            targetRMFeedbacksInfo.setCommentStrengths(sourceRMFeedbackDTO.getCommentStrengths());
        if (sourceRMFeedbackDTO.getCommentAreasOfImprovement() != null && !sourceRMFeedbackDTO.getCommentAreasOfImprovement().isEmpty())
            targetRMFeedbacksInfo.setCommentAreasOfImprovement(sourceRMFeedbackDTO.getCommentAreasOfImprovement());
        if (sourceRMFeedbackDTO.getCommentTrainingNeeded() != null && !sourceRMFeedbackDTO.getCommentTrainingNeeded().isEmpty())
            targetRMFeedbacksInfo.setCommentTrainingNeeded(sourceRMFeedbackDTO.getCommentTrainingNeeded());
        if (sourceRMFeedbackDTO.getHrApproved() != null && !sourceRMFeedbackDTO.getHrApproved().isEmpty())
            targetRMFeedbacksInfo.setHrApproved(Boolean.parseBoolean(sourceRMFeedbackDTO.getHrApproved()));
        if (sourceRMFeedbackDTO.getHrCommentStrengths() != null && !sourceRMFeedbackDTO.getHrCommentStrengths().isEmpty())
            targetRMFeedbacksInfo.setHrCommentStrengths(sourceRMFeedbackDTO.getHrCommentStrengths());
        if (sourceRMFeedbackDTO.getHrCommentAreasOfImprovement() != null && !sourceRMFeedbackDTO.getHrCommentAreasOfImprovement().isEmpty())
            targetRMFeedbacksInfo.setHrCommentAreasOfImprovement(sourceRMFeedbackDTO.getHrCommentAreasOfImprovement());
        if (sourceRMFeedbackDTO.getHrCommentTrainingNeeded() != null && !sourceRMFeedbackDTO.getHrCommentTrainingNeeded().isEmpty())
            targetRMFeedbacksInfo.setHrCommentTrainingNeeded(sourceRMFeedbackDTO.getHrCommentTrainingNeeded());*/

        return targetRMFeedbacksInfo;
    }

    private RMFeedbackDTO mapRMFeedbacksInfo2RMFeedbackDTO(RMFeedbacksInfo sourceRMFeedbacksInfo, RMFeedbackDTO targetRMFeedbackDTO) {
//        if (targetRMFeedbackDTO == null)
//            targetRMFeedbackDTO = new RMFeedbackDTO();
//        targetRMFeedbackDTO.setRmFeedbackId(String.valueOf(sourceRMFeedbacksInfo.getRmFeedbackId()));
//        targetRMFeedbackDTO.setEmployeeId(sourceRMFeedbacksInfo.getEmployeeInfo().getEmployeeId());
//        targetRMFeedbackDTO.setEmployeeName(sourceRMFeedbacksInfo.getEmployeeInfo().getFirstName() + " " + sourceRMFeedbacksInfo.getEmployeeInfo().getLastName());
//        targetRMFeedbackDTO.setBusinessUnit(sourceRMFeedbacksInfo.getBusinessUnit());
//        targetRMFeedbackDTO.setRmFeedbackDate(CustomUtil.getGenericDateFormat().format(sourceRMFeedbacksInfo.getRmFeedbackDate()));
//        targetRMFeedbackDTO.setPerformanceRatings(sourceRMFeedbacksInfo.getPerformanceRatings());
//        targetRMFeedbackDTO.setAverageRating(sourceRMFeedbacksInfo.getAverageRating());
//        if (sourceRMFeedbacksInfo.getCommentStrengths() != null && !sourceRMFeedbacksInfo.getCommentStrengths().isEmpty())
//            targetRMFeedbackDTO.setCommentStrengths(sourceRMFeedbacksInfo.getCommentStrengths());
//        if (sourceRMFeedbacksInfo.getCommentAreasOfImprovement() != null && !sourceRMFeedbacksInfo.getCommentAreasOfImprovement().isEmpty())
//            targetRMFeedbackDTO.setCommentAreasOfImprovement(sourceRMFeedbacksInfo.getCommentAreasOfImprovement());
//        if (sourceRMFeedbacksInfo.getCommentTrainingNeeded() != null && !sourceRMFeedbacksInfo.getCommentTrainingNeeded().isEmpty())
//            targetRMFeedbackDTO.setCommentTrainingNeeded(sourceRMFeedbacksInfo.getCommentTrainingNeeded());
//        targetRMFeedbackDTO.setHrApproved(String.valueOf(sourceRMFeedbacksInfo.isHrApproved()));
//        if (sourceRMFeedbacksInfo.getHrAverageRating() != null && !sourceRMFeedbacksInfo.getHrAverageRating().isEmpty())
//            targetRMFeedbackDTO.setHrAverageRating(sourceRMFeedbacksInfo.getHrAverageRating());
//        if (sourceRMFeedbacksInfo.getHrCommentStrengths() != null && !sourceRMFeedbacksInfo.getHrCommentStrengths().isEmpty())
//            targetRMFeedbackDTO.setHrCommentStrengths(sourceRMFeedbacksInfo.getHrCommentStrengths());
//        if (sourceRMFeedbacksInfo.getHrCommentAreasOfImprovement() != null && !sourceRMFeedbacksInfo.getHrCommentAreasOfImprovement().isEmpty())
//            targetRMFeedbackDTO.setHrCommentAreasOfImprovement(sourceRMFeedbacksInfo.getHrCommentAreasOfImprovement());
//        if (sourceRMFeedbacksInfo.getHrCommentTrainingNeeded() != null && !sourceRMFeedbacksInfo.getHrCommentTrainingNeeded().isEmpty())
//            targetRMFeedbackDTO.setHrCommentTrainingNeeded(sourceRMFeedbacksInfo.getHrCommentTrainingNeeded());

        return targetRMFeedbackDTO;
    }

    private RMFeedbacksListDTO mapRMFeedbacksInfo2RMFeedbacksListDTO(RMFeedbacksInfo sourceRMFeedbacksInfo, RMFeedbacksListDTO targetRMFeedbacksListDTO) {
        /*if (targetRMFeedbacksListDTO == null)
            targetRMFeedbacksListDTO = new RMFeedbacksListDTO();
        targetRMFeedbacksListDTO.setRmFeedbackId(String.valueOf(sourceRMFeedbacksInfo.getRmFeedbackId()));
        targetRMFeedbacksListDTO.setEmployeeId(sourceRMFeedbacksInfo.getEmployeeInfo().getEmployeeId());
        targetRMFeedbacksListDTO.setEmployeeName(sourceRMFeedbacksInfo.getEmployeeInfo().getFirstName() + " " + sourceRMFeedbacksInfo.getEmployeeInfo().getLastName());
        targetRMFeedbacksListDTO.setRmFeedbackDate(CustomUtil.getGenericDateFormat().format(sourceRMFeedbacksInfo.getRmFeedbackDate()));
        targetRMFeedbacksListDTO.setAverageRating(sourceRMFeedbacksInfo.getAverageRating());*/

        return targetRMFeedbacksListDTO;
    }

    public List<RMFeedbacksInfo> findAllRMFeedback() {
        return rmFeedbacksInfoRepo.findAll();
    }

    public RMFeedbacksInfo findByrmFeedbackId(int selfAppraisalId) {
        return rmFeedbacksInfoRepo.findByrmFeedbackId(selfAppraisalId);
    }

    public RMFeedbacksInfo saveRMFeedback(RMFeedbacksInfo rmFeedbacksInfo) throws Exception {
        return rmFeedbacksInfoRepo.save(rmFeedbacksInfo);
    }
}
