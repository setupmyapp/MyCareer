package com.ifocus.auth.model.db;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @Column(name = "firsttimelogin")
    private boolean firstTimeLogin;
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
    @OneToOne(mappedBy = "userInfo")
    private RefreshTokenInfo refreshTokenInfo;
}
