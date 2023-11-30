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
@Entity(name = "SelfAppraisalsInfo")
@Table(name = "tbl_selfappraisalsinfo")
public class SelfAppraisalsInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "selfappraisalid")
    private int selfAppraisalId;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "employeeid", referencedColumnName = "employeeid", nullable = false)
    private EmployeeInfo employeeInfo;
    @Column(name = "gnotechnology")
    private String gnoTechnology;
    @Column(name = "gnojobknowledge", nullable = false)
    private String gnoJobKnowledge;
    @Column(name = "gnodependability")
    private String gnoDependability;
    @Column(name = "gnoanalytical")
    private String gnoAnalytical;
    @Column(name = "gnoquality")
    private String gnoQuality;
    @Column(name = "gnocom")
    private String gnoCom;
    @Column(name = "gnoteamwork")
    private String gnoTeamWork;
    @Column(name = "gnocompletion")
    private String gnoCompletion;
    @Column(name = "gnocommentbyemployee")
    private String gnoCommentByEmployee;
    @Column(name = "gnofromdate", nullable = false)
    private Date gnoFromDate;
    @Column(name = "gnotodate", nullable = false)
    private Date gnoToDate;
    @Column(name = "gnoaddeddate", nullable = false)
    private Date gnoAddedDate;
    @Column(name = "gnoapproved", columnDefinition = "boolean default false")
    private boolean gnoApproved;
    @Column(name = "gnoapprovalcomment")
    private String gnoApprovalComment;
    @Column(name = "gnoapproveddate")
    private Date gnoApprovedDate;
    @Column(name = "gnotentativerating")
    private int gnoTentativeRating;
    @Column(name = "gnotentativeratingcomment")
    private String gnoTentativeRatingComment;
    @Column(name = "gnotentativeratingdate")
    private Date gnoTentativeRatingDate;
    @Column(name = "gnoRatingEmployeeAccepted", columnDefinition = "boolean default false")
    private boolean gnoRatingEmployeeAccepted;
    @Column(name = "gnoRatingEmployeeFeedback")
    private String gnoRatingEmployeeFeedback;
    @Column(name = "gnofinalrating")
    private int gnoFinalRating;
    @Column(name = "gnofinalratingcomment")
    private String gnoFinalRatingComment;
    @Column(name = "gnofinalratingdate")
    private Date gnoFinalRatingDate;
}
