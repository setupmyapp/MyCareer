package com.ifocus.tracking.model.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"upSkillsInfoList", "rmFeedbacksInfoList", "employeesAttendanceInfoList", "selfAppraisalsInfoList"})
@Entity(name = "EmployeeInfo")
@Table(name = "tbl_employeeinfo")
public class EmployeeInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "employeeid", unique = true, nullable = false)
    private String employeeId;
    @Column(name = "userid", nullable = false)
    private int userId;
    @Column(name = "firstname", nullable = false)
    private String firstName;
    @Column(name = "middlename")
    private String middleName;
    @Column(name = "lastname", nullable = false)
    private String lastName;
    @Column(name = "emailid", unique = true, nullable = false)
    private String emailId;
    @Column(name = "contactno", unique = true, nullable = false)
    private String contactNo;
    @Column(name = "birthdate")
    private Date birthDate;
    @Column(name = "dpfilepath")
    private String dpFilePath;
    @Column(name = "designation")
    private String designation;
    @Column(name = "experiencewhenjoined")
    private int experienceWhenJoined;
    @Column(name = "experiencebyskills")
    private String experienceBySkills;
    @Column(name = "joiningdate")
    private Date joiningDate;
    @Column(name = "lastworkingdate")
    private Date lastWorkingDate;
    @Column(name = "totalexperience")
    private int totalExperience;
    @Column(name = "previousappraisaldate")
    private Date previousAppraisalDate;
    @Column(name = "appraisalduedate")
    private Date appraisalDueDate;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "bandid", referencedColumnName = "bandid")
    private BandsMaster bandsMaster;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "costcenterid", referencedColumnName = "costcenterid")
    private CostCentersMaster costCentersMaster;
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "departmentid", referencedColumnName = "departmentid")
    private DepartmentsMaster departmentsMaster;
    @Column(name = "namerm")
    private String nameRM;
    @Column(name = "emailrm")
    private String emailRM;
    @Column(name = "contactrm")
    private String contactRM;
    @Column(name = "aream", nullable = false, columnDefinition = "boolean default false")
    private boolean areAM;
    @Column(name = "emailam")
    private String emailAM;
    @Column(name = "passwrdam")
    private String passwrdAM;
    @Column(name = "underam")
    private String underAM;
    @Column(name = "hashrapproved", columnDefinition = "boolean default false")
    private boolean hasHRApproved;
    @Column(name = "arebillable", columnDefinition = "boolean default false")
    private boolean areBillable;
    @Column(name = "kpidetails")
    private String kpiDetails;
    @OneToMany(mappedBy = "employeeInfo")
    private List<UpSkillsInfo> upSkillsInfoList;
    @OneToMany(mappedBy = "employeeInfo")
    private List<EmployeesAttendanceInfo> employeesAttendanceInfoList;
    @OneToMany(mappedBy = "employeeInfo")
    private List<RMFeedbacksInfo> rmFeedbacksInfoList;
    @OneToMany(mappedBy = "employeeInfo")
    private List<SelfAppraisalsInfo> selfAppraisalsInfoList;
}