package com.ifocus.auth.model.db;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "RefreshTokenInfo")
@Table(name = "tbl_refreshtokeninfo")
public class RefreshTokenInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refreshtokenid")
    private int refreshTokenID;
    @OneToOne()
    @JoinColumn(name = "userid", referencedColumnName = "userid", unique = true)
    private UserInfo userInfo;
    @Column(name = "refreshtoken", unique = true)
    private String refreshToken;
    @Column(name = "expirydate")
    private Instant expiryDate;

    public RefreshTokenInfo(UserInfo userInfo, String refreshToken, Instant expiryDate) {
        this.userInfo = userInfo;
        this.refreshToken = refreshToken;
        this.expiryDate = expiryDate;
    }

}
