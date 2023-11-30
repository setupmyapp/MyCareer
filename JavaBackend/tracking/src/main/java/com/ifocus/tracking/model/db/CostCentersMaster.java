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
@Entity(name = "CostCentersMaster")
@Table(name = "tbl_costcentersmaster")
public class CostCentersMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "costcenterid")
    private int costCenterId;
    @Column(name = "costcentername", unique = true)
    private String costCenterName;
    @Column(name = "costcenterlocation")
    private String costCenterLocation;
    @OneToMany(mappedBy = "costCentersMaster")
    private List<EmployeeInfo> employeeInfoList;
}
