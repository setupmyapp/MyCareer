package com.ifocus.tracking.model.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"upSkillsInfoList"})
@Entity(name = "UpSkillTypesMaster")
@Table(name = "tbl_upskilltypesmaster")
public class UpSkillTypesMaster implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "upskilltypeid")
    private int upSkillTypeId;
    @Column(name = "upskilltypename", unique = true)
    private String upSkillTypeName;
    @OneToMany(mappedBy = "upSkillTypesMaster")
    private List<UpSkillsInfo> upSkillsInfoList;
}
