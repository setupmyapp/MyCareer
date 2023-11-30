package com.ifocus.tracking.model.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity(name = "UserInfo")
@Table(name = "tbl_userinfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private int userId;
    @Column(name = "username", unique = true)
    private String userName;
    @Column(name = "passwrd")
    private String passWrd;
    @Column(name = "emailid", unique = true)
    private String emailId;
    @Column(name = "haspasswrdchanged")
    private boolean hasPassWrdChanged;
    @Column(name = "areaccountnonexpired")
    private boolean areAccountNonExpired;
    @Column(name = "areaccountnonlocked")
    private boolean areAccountNonLocked;
    @Column(name = "arecredentialsnonexpired")
    private boolean areCredentialsNonExpired;
    @Column(name = "areenabled")
    private boolean areEnabled;
    @ManyToOne()
    @JoinColumn(name = "rollid", referencedColumnName = "rollid")
    private RolesMaster rolesMaster;
}
