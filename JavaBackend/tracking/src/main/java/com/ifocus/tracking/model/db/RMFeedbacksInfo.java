package com.ifocus.tracking.model.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity(name = "RMFeedbacksInfo")
@Table(name = "tbl_rmfeedbacksinfo")
public class RMFeedbacksInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rmfeedbackid")
    private int rmFeedbackId;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "employeeid", referencedColumnName = "employeeid", nullable = false)
    private EmployeeInfo employeeInfo;
    @Column(name = "rmfeedbackdate", nullable = false)
    private Date rmFeedbackDate;
    @Column(name = "businessunit", nullable = false)
    private String businessUnit;
    @Column(name = "rmtechnology")
    private String rmTechnology;
    @Column(name = "rmjobknowledge", nullable = false)
    private String rmJobKnowledge;
    @Column(name = "rmdependability")
    private String rmDependability;
    @Column(name = "rmanalytical")
    private String rmAnalytical;
    @Column(name = "rmquality")
    private String rmQuality;
    @Column(name = "rmcom")
    private String rmCom;
    @Column(name = "rmteamwork")
    private String rmTeamWork;
    @Column(name = "rmcompletion")
    private String rmCompletion;
    @Column(name = "rmaveragerating", nullable = false)
    private String rmAverageRating;
    @Column(name = "commentstrengths")
    private String commentStrengths;
    @Column(name = "commentareasofimprovement")
    private String commentAreasOfImprovement;
    @Column(name = "commenttrainingneeded")
    private String commentTrainingNeeded;
    @Column(name = "hrapproved", columnDefinition = "boolean default false")
    private boolean hrApproved;
    @Column(name = "hraveragerating")
    private String hrAverageRating;
    @Column(name = "hrcommentstrengths")
    private String hrCommentStrengths;
    @Column(name = "hrcommentareasofimprovement")
    private String hrCommentAreasOfImprovement;
    @Column(name = "hrcommenttrainingneeded")
    private String hrCommentTrainingNeeded;
}
