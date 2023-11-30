package com.ifocus.tracking.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RMFeedbackDTO {

    private String rmFeedbackId;
    private String employeeId;
    private String employeeName;
    private String rmName;
    private String businessUnit;
    private String rmFeedbackDate;
    private String rmTechnology;
    private String rmJobKnowledge;
    private String rmDependability;
    private String rmAnalytical;
    private String rmQuality;
    private String rmCom;
    private String rmTeamWork;
    private String rmCompletion;
    private String rmAverageRating;
    private String commentStrengths;
    private String commentAreasOfImprovement;
    private String commentTrainingNeeded;
    private String hrApproved;
    private String hrAverageRating;
    private String hrCommentStrengths;
    private String hrCommentAreasOfImprovement;
    private String hrCommentTrainingNeeded;
}
