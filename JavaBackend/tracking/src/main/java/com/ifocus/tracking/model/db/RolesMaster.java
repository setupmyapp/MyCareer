package com.ifocus.tracking.model.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"userInfoList"})
@Entity(name = "RolesMaster")
@Table(name = "tbl_rolesmaster")
public class RolesMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rollid")
    private int rollId;
    @Column(name = "rollname", unique = true)
    private String rollName;

    @OneToMany(mappedBy = "rolesMaster")
    private List<UserInfo> userInfoList;

    public RolesMaster(String rollName) {
        this.rollName = rollName;
    }
}
