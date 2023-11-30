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
@Entity(name = "BandsMaster")
@Table(name = "tbl_bandsmaster")
public class BandsMaster {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "bandid")
    private int bandId;
    @Column(name = "experience")
    private int experience;
    @Column(name = "grade", unique = true)
    private String grade;
    @OneToMany(mappedBy = "bandsMaster")
    private List<EmployeeInfo> employeeInfoList;
}
