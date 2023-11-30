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
@Entity(name = "UpSkillsInfo")
@Table(name = "tbl_upskillsinfo")
public class UpSkillsInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "upskillid")
    private int upSkillId;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "employeeid", referencedColumnName = "employeeid", nullable = false)
    private EmployeeInfo employeeInfo;
    @Column(name = "coursename", nullable = false)
    private String courseName;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "upskilltypeid", referencedColumnName = "upskilltypeid", nullable = false)
    private UpSkillTypesMaster upSkillTypesMaster;
    @Column(name = "targetskillset", nullable = false)
    private String targetSkillSet;
    @Column(name = "startdate", nullable = false)
    private Date startDate;
    @Column(name = "enddate", nullable = false)
    private Date endDate;
    @Column(name = "fees")
    private double fees;
    @Column(name = "feesreceiptfilepath")
    private String feesReceiptFilePath;
    @Column(name = "certificatefilepath")
    private String certificateFilePath;
    @Column(name = "hashrverified", columnDefinition = "boolean default false")
    private boolean hasHRVerified;
    @Column(name = "hashrapprovedfees", columnDefinition = "boolean default false")
    private boolean hasHRApprovedFees;

}
