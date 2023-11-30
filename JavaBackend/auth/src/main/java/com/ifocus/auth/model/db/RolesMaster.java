package com.ifocus.auth.model.db;

import lombok.*;

import javax.persistence.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity(name = "RolesMaster")
@Table(name = "tbl_rolesmaster")
public class RolesMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rollid")
    private int rollID;
    @Column(name = "rollname", unique = true)
    private String rollName;

    @OneToMany(mappedBy = "rolesMaster")
    private List<UserInfo> userInfoList;

}
