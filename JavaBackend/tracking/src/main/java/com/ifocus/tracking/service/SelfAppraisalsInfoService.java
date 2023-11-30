package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.SelfAppraisalsInfo;
import com.ifocus.tracking.model.dto.SelfAppraisalDTO;
import com.ifocus.tracking.model.dto.SelfAppraisalsListDTO;
import com.ifocus.tracking.repo.SelfAppraisalsInfoRepo;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class SelfAppraisalsInfoService {

    private final SelfAppraisalsInfoRepo selfAppraisalsInfoRepo;
    private final EmployeeInfoService employeeInfoService;

    @Autowired
    public SelfAppraisalsInfoService(SelfAppraisalsInfoRepo selfAppraisalsInfoRepo, EmployeeInfoService employeeInfoService) {
        this.selfAppraisalsInfoRepo = selfAppraisalsInfoRepo;
        this.employeeInfoService = employeeInfoService;
    }

    public SelfAppraisalsInfo createSelfAppraisal(SelfAppraisalDTO selfAppraisalDTO) throws ParseException {
        return mapSelfAppraisalDTO2SelfAppraisalsInfo(selfAppraisalDTO, null);
    }

    public SelfAppraisalsInfo editSelfAppraisal(SelfAppraisalDTO selfAppraisalDTO) throws ParseException {
        return mapSelfAppraisalDTO2SelfAppraisalsInfo(selfAppraisalDTO, findBySelfAppraisalId(Integer.parseInt(selfAppraisalDTO.getSelfAppraisalId())));
    }

    public SelfAppraisalDTO getSelfAppraisal(SelfAppraisalsInfo selfAppraisalsInfo) {
        return mapSelfAppraisalsInfo2SelfAppraisalDTO(selfAppraisalsInfo, null);
    }

    public SelfAppraisalsListDTO getSelfAppraisals(SelfAppraisalsInfo selfAppraisalsInfo) {
        return mapSelfAppraisalsInfo2SelfAppraisalsListDTO(selfAppraisalsInfo, null);
    }

    private SelfAppraisalsInfo mapSelfAppraisalDTO2SelfAppraisalsInfo(SelfAppraisalDTO sourceSelfAppraisalDTO, SelfAppraisalsInfo targetSelfAppraisalsInfo) throws ParseException {
        if (targetSelfAppraisalsInfo == null) {
            targetSelfAppraisalsInfo = new SelfAppraisalsInfo();
            targetSelfAppraisalsInfo.setEmployeeInfo(employeeInfoService.findByEmployeeId(sourceSelfAppraisalDTO.getEmployeeId()));
        }
        if (sourceSelfAppraisalDTO.getGnoTechnology() != null && !sourceSelfAppraisalDTO.getGnoTechnology().isEmpty())
            targetSelfAppraisalsInfo.setGnoTechnology(sourceSelfAppraisalDTO.getGnoTechnology());
        if (sourceSelfAppraisalDTO.getGnoJobKnowledge() != null && !sourceSelfAppraisalDTO.getGnoJobKnowledge().isEmpty())
            targetSelfAppraisalsInfo.setGnoJobKnowledge(sourceSelfAppraisalDTO.getGnoJobKnowledge());
        if (sourceSelfAppraisalDTO.getGnoDependability() != null && !sourceSelfAppraisalDTO.getGnoDependability().isEmpty())
            targetSelfAppraisalsInfo.setGnoDependability(sourceSelfAppraisalDTO.getGnoDependability());
        if (sourceSelfAppraisalDTO.getGnoAnalytical() != null && !sourceSelfAppraisalDTO.getGnoAnalytical().isEmpty())
            targetSelfAppraisalsInfo.setGnoAnalytical(sourceSelfAppraisalDTO.getGnoAnalytical());
        if (sourceSelfAppraisalDTO.getGnoQuality() != null && !sourceSelfAppraisalDTO.getGnoQuality().isEmpty())
            targetSelfAppraisalsInfo.setGnoQuality(sourceSelfAppraisalDTO.getGnoQuality());
        if (sourceSelfAppraisalDTO.getGnoCom() != null && !sourceSelfAppraisalDTO.getGnoCom().isEmpty())
            targetSelfAppraisalsInfo.setGnoCom(sourceSelfAppraisalDTO.getGnoCom());
        if (sourceSelfAppraisalDTO.getGnoTeamWork() != null && !sourceSelfAppraisalDTO.getGnoTeamWork().isEmpty())
            targetSelfAppraisalsInfo.setGnoTeamWork(sourceSelfAppraisalDTO.getGnoTeamWork());
        if (sourceSelfAppraisalDTO.getGnoCompletion() != null && !sourceSelfAppraisalDTO.getGnoCompletion().isEmpty())
            targetSelfAppraisalsInfo.setGnoCompletion(sourceSelfAppraisalDTO.getGnoCompletion());
        if (sourceSelfAppraisalDTO.getGnoCommentByEmployee() != null && !sourceSelfAppraisalDTO.getGnoCommentByEmployee().isEmpty())
            targetSelfAppraisalsInfo.setGnoCommentByEmployee(sourceSelfAppraisalDTO.getGnoCommentByEmployee());
        if (sourceSelfAppraisalDTO.getGnoFromDate() != null && !sourceSelfAppraisalDTO.getGnoFromDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoFromDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoFromDate()));
        if (sourceSelfAppraisalDTO.getGnoToDate() != null && !sourceSelfAppraisalDTO.getGnoToDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoToDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoToDate()));
        if (sourceSelfAppraisalDTO.getGnoAddedDate() != null && !sourceSelfAppraisalDTO.getGnoAddedDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoAddedDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoAddedDate()));
        if (sourceSelfAppraisalDTO.getGnoApproved() != null && !sourceSelfAppraisalDTO.getGnoApproved().isEmpty())
            targetSelfAppraisalsInfo.setGnoApproved(Boolean.parseBoolean(sourceSelfAppraisalDTO.getGnoApproved()));
        if (sourceSelfAppraisalDTO.getGnoApprovalComment() != null && !sourceSelfAppraisalDTO.getGnoApprovalComment().isEmpty())
            targetSelfAppraisalsInfo.setGnoApprovalComment(sourceSelfAppraisalDTO.getGnoApprovalComment());
        if (sourceSelfAppraisalDTO.getGnoApprovedDate() != null && !sourceSelfAppraisalDTO.getGnoApprovedDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoApprovedDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoApprovedDate()));
        if (sourceSelfAppraisalDTO.getGnoTentativeRating() != null && !sourceSelfAppraisalDTO.getGnoTentativeRating().isEmpty())
            targetSelfAppraisalsInfo.setGnoTentativeRating(Integer.parseInt(sourceSelfAppraisalDTO.getGnoTentativeRating()));
        if (sourceSelfAppraisalDTO.getGnoTentativeRatingComment() != null && !sourceSelfAppraisalDTO.getGnoTentativeRatingComment().isEmpty())
            targetSelfAppraisalsInfo.setGnoTentativeRatingComment(sourceSelfAppraisalDTO.getGnoTentativeRatingComment());
        if (sourceSelfAppraisalDTO.getGnoTentativeRatingDate() != null && !sourceSelfAppraisalDTO.getGnoTentativeRatingDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoTentativeRatingDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoTentativeRatingDate()));
        if (sourceSelfAppraisalDTO.getGnoRatingEmployeeAccepted() != null && !sourceSelfAppraisalDTO.getGnoRatingEmployeeAccepted().isEmpty())
            targetSelfAppraisalsInfo.setGnoRatingEmployeeAccepted(Boolean.parseBoolean(sourceSelfAppraisalDTO.getGnoRatingEmployeeAccepted()));
        if (sourceSelfAppraisalDTO.getGnoRatingEmployeeFeedback() != null && !sourceSelfAppraisalDTO.getGnoRatingEmployeeFeedback().isEmpty())
            targetSelfAppraisalsInfo.setGnoRatingEmployeeFeedback(sourceSelfAppraisalDTO.getGnoRatingEmployeeFeedback());
        if (sourceSelfAppraisalDTO.getGnoFinalRating() != null && !sourceSelfAppraisalDTO.getGnoFinalRating().isEmpty())
            targetSelfAppraisalsInfo.setGnoFinalRating(Integer.parseInt(sourceSelfAppraisalDTO.getGnoFinalRating()));
        if (sourceSelfAppraisalDTO.getGnoFinalRatingComment() != null && !sourceSelfAppraisalDTO.getGnoFinalRatingComment().isEmpty())
            targetSelfAppraisalsInfo.setGnoFinalRatingComment(sourceSelfAppraisalDTO.getGnoFinalRatingComment());
        if (sourceSelfAppraisalDTO.getGnoFinalRatingDate() != null && !sourceSelfAppraisalDTO.getGnoFinalRatingDate().isEmpty())
            targetSelfAppraisalsInfo.setGnoFinalRatingDate(CustomUtil.getGenericDateFormat().parse(sourceSelfAppraisalDTO.getGnoFinalRatingDate()));

        return targetSelfAppraisalsInfo;
    }

    private SelfAppraisalDTO mapSelfAppraisalsInfo2SelfAppraisalDTO(SelfAppraisalsInfo sourceSelfAppraisalsInfo, SelfAppraisalDTO targetSelfAppraisalDTO) {
        if (targetSelfAppraisalDTO == null)
            targetSelfAppraisalDTO = new SelfAppraisalDTO();
        targetSelfAppraisalDTO.setSelfAppraisalId(String.valueOf(sourceSelfAppraisalsInfo.getSelfAppraisalId()));
        targetSelfAppraisalDTO.setEmployeeId(sourceSelfAppraisalsInfo.getEmployeeInfo().getEmployeeId());
        targetSelfAppraisalDTO.setEmployeeName(sourceSelfAppraisalsInfo.getEmployeeInfo().getFirstName() + " " + sourceSelfAppraisalsInfo.getEmployeeInfo().getLastName());
        if (sourceSelfAppraisalsInfo.getGnoTechnology() != null && !sourceSelfAppraisalsInfo.getGnoTechnology().isEmpty())
            targetSelfAppraisalDTO.setGnoTechnology(sourceSelfAppraisalsInfo.getGnoTechnology());
        if (sourceSelfAppraisalsInfo.getGnoJobKnowledge() != null && !sourceSelfAppraisalsInfo.getGnoJobKnowledge().isEmpty())
            targetSelfAppraisalDTO.setGnoJobKnowledge(sourceSelfAppraisalsInfo.getGnoJobKnowledge());
        if (sourceSelfAppraisalsInfo.getGnoDependability() != null && !sourceSelfAppraisalsInfo.getGnoDependability().isEmpty())
            targetSelfAppraisalDTO.setGnoDependability(sourceSelfAppraisalsInfo.getGnoDependability());
        if (sourceSelfAppraisalsInfo.getGnoAnalytical() != null && !sourceSelfAppraisalsInfo.getGnoAnalytical().isEmpty())
            targetSelfAppraisalDTO.setGnoAnalytical(sourceSelfAppraisalsInfo.getGnoAnalytical());
        if (sourceSelfAppraisalsInfo.getGnoQuality() != null && !sourceSelfAppraisalsInfo.getGnoQuality().isEmpty())
            targetSelfAppraisalDTO.setGnoQuality(sourceSelfAppraisalsInfo.getGnoQuality());
        if (sourceSelfAppraisalsInfo.getGnoCom() != null && !sourceSelfAppraisalsInfo.getGnoCom().isEmpty())
            targetSelfAppraisalDTO.setGnoCom(sourceSelfAppraisalsInfo.getGnoCom());
        if (sourceSelfAppraisalsInfo.getGnoTeamWork() != null && !sourceSelfAppraisalsInfo.getGnoTeamWork().isEmpty())
            targetSelfAppraisalDTO.setGnoTeamWork(sourceSelfAppraisalsInfo.getGnoTeamWork());
        if (sourceSelfAppraisalsInfo.getGnoCompletion() != null && !sourceSelfAppraisalsInfo.getGnoCompletion().isEmpty())
            targetSelfAppraisalDTO.setGnoCompletion(sourceSelfAppraisalsInfo.getGnoCompletion());
        if (sourceSelfAppraisalsInfo.getGnoCommentByEmployee() != null && !sourceSelfAppraisalsInfo.getGnoCommentByEmployee().isEmpty())
            targetSelfAppraisalDTO.setGnoCommentByEmployee(sourceSelfAppraisalsInfo.getGnoCommentByEmployee());
        targetSelfAppraisalDTO.setGnoFromDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoFromDate()));
        targetSelfAppraisalDTO.setGnoToDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoToDate()));
        targetSelfAppraisalDTO.setGnoAddedDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoAddedDate()));
        targetSelfAppraisalDTO.setGnoApproved(String.valueOf(sourceSelfAppraisalsInfo.isGnoApproved()));
        if (sourceSelfAppraisalsInfo.getGnoApprovalComment() != null && !sourceSelfAppraisalsInfo.getGnoApprovalComment().isEmpty())
            targetSelfAppraisalDTO.setGnoApprovalComment(sourceSelfAppraisalsInfo.getGnoApprovalComment());
        if (sourceSelfAppraisalsInfo.getGnoApprovedDate() != null)
            targetSelfAppraisalDTO.setGnoApprovedDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoApprovedDate()));
        targetSelfAppraisalDTO.setGnoTentativeRating(String.valueOf(sourceSelfAppraisalsInfo.getGnoTentativeRating()));
        if (sourceSelfAppraisalsInfo.getGnoTentativeRatingComment() != null && !sourceSelfAppraisalsInfo.getGnoTentativeRatingComment().isEmpty())
            targetSelfAppraisalDTO.setGnoTentativeRatingComment(sourceSelfAppraisalsInfo.getGnoTentativeRatingComment());
        if (sourceSelfAppraisalsInfo.getGnoTentativeRatingDate() != null)
            targetSelfAppraisalDTO.setGnoTentativeRatingDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoTentativeRatingDate()));
        targetSelfAppraisalDTO.setGnoRatingEmployeeAccepted(String.valueOf(sourceSelfAppraisalsInfo.isGnoRatingEmployeeAccepted()));
        if (sourceSelfAppraisalsInfo.getGnoRatingEmployeeFeedback() != null && !sourceSelfAppraisalsInfo.getGnoRatingEmployeeFeedback().isEmpty())
            targetSelfAppraisalDTO.setGnoRatingEmployeeFeedback(sourceSelfAppraisalsInfo.getGnoRatingEmployeeFeedback());
        targetSelfAppraisalDTO.setGnoFinalRating(String.valueOf(sourceSelfAppraisalsInfo.getGnoFinalRating()));
        if (sourceSelfAppraisalsInfo.getGnoFinalRatingComment() != null && !sourceSelfAppraisalsInfo.getGnoFinalRatingComment().isEmpty())
            targetSelfAppraisalDTO.setGnoFinalRatingComment(sourceSelfAppraisalsInfo.getGnoFinalRatingComment());
        if (sourceSelfAppraisalsInfo.getGnoFinalRatingDate() != null)
            targetSelfAppraisalDTO.setGnoFinalRatingDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoFinalRatingDate()));

        return targetSelfAppraisalDTO;
    }

    private SelfAppraisalsListDTO mapSelfAppraisalsInfo2SelfAppraisalsListDTO(SelfAppraisalsInfo sourceSelfAppraisalsInfo, SelfAppraisalsListDTO targetSelfAppraisalsListDTO) {
        if (targetSelfAppraisalsListDTO == null)
            targetSelfAppraisalsListDTO = new SelfAppraisalsListDTO();
        targetSelfAppraisalsListDTO.setSelfAppraisalId(String.valueOf(sourceSelfAppraisalsInfo.getSelfAppraisalId()));
        targetSelfAppraisalsListDTO.setEmployeeId(sourceSelfAppraisalsInfo.getEmployeeInfo().getEmployeeId());
        targetSelfAppraisalsListDTO.setEmployeeName(sourceSelfAppraisalsInfo.getEmployeeInfo().getFirstName() + "" + sourceSelfAppraisalsInfo.getEmployeeInfo().getLastName());
        targetSelfAppraisalsListDTO.setGnoFromDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoFromDate()));
        targetSelfAppraisalsListDTO.setGnoToDate(CustomUtil.getGenericDateFormat().format(sourceSelfAppraisalsInfo.getGnoToDate()));

        return targetSelfAppraisalsListDTO;
    }

    public List<SelfAppraisalsInfo> findAllSelfAppraisals() {
        return selfAppraisalsInfoRepo.findAll();
    }

    public SelfAppraisalsInfo findBySelfAppraisalId(int selfAppraisalId) {
        return selfAppraisalsInfoRepo.findBySelfAppraisalId(selfAppraisalId);
    }

    public SelfAppraisalsInfo saveSelfAppraisal(SelfAppraisalsInfo selfAppraisalsInfo) throws Exception {
        return selfAppraisalsInfoRepo.save(selfAppraisalsInfo);
    }
}
