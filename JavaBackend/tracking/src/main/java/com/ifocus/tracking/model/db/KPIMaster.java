package com.ifocus.tracking.model.db;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity(name = "KPIMaster")
@Table(name = "tbl_kpimaster")
public class KPIMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kpiid")
    private int KPIId;
    @Column(name = "kpiname", unique = true)
    private String KPIName;
}
