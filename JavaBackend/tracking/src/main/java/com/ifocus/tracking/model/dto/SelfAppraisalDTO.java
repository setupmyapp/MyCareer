package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SelfAppraisalDTO {

    private String selfAppraisalId;
    @NotNull @NotBlank
    private String employeeId;
    private String employeeName;
    private String gnoTechnology;
    private String gnoJobKnowledge;
    private String gnoDependability;
    private String gnoAnalytical;
    private String gnoQuality;
    private String gnoCom;
    private String gnoTeamWork;
    private String gnoCompletion;
    private String gnoCommentByEmployee;
    private String gnoFromDate;
    private String gnoToDate;
    private String gnoAddedDate;
    private String gnoApproved;
    private String gnoApprovalComment;
    private String gnoApprovedDate;
    private String gnoTentativeRating;
    private String gnoTentativeRatingComment;
    private String gnoTentativeRatingDate;
    private String gnoRatingEmployeeAccepted;
    private String gnoRatingEmployeeFeedback;
    private String gnoFinalRating;
    private String gnoFinalRatingComment;
    private String gnoFinalRatingDate;
}
