package com.ifocus.tracking.model.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"employeeInfoList"})
@Entity(name = "DepartmentsMaster")
@Table(name = "tbl_departmentsmaster")
public class DepartmentsMaster {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "departmentid")
    private int departmentId;
    @Column(name = "departmentname", unique = true)
    private String departmentName;
    @Column(name = "departmenthead")
    private String departmentHead;
    @OneToMany(mappedBy = "departmentsMaster")
    private List<EmployeeInfo> employeeInfoList;
}
