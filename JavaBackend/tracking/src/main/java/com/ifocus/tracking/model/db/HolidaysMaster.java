package com.ifocus.tracking.model.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity(name = "HolidaysMaster")
@Table(name = "tbl_holidaysmaster")
public class HolidaysMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "holidayid")
    private int holidayId;
    @Column(name = "year")
    private int year;
    @Column(name = "month")
    private int month;
    @Column(name = "holidaydate")
    private Date holidayDate;
    @Column(name = "holidayname")
    private String holidayName;
    @Column(name = "holidaytype")
    private String holidayType;
}
