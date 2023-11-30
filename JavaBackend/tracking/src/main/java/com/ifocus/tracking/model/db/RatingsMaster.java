package com.ifocus.tracking.model.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@ToString
@Entity(name = "RatingsMaster")
@Table(name = "tbl_ratingsmaster")
public class RatingsMaster {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "ratingid")
    private int ratingId;
    @Column(name = "ratinggrade", unique = true)
    private int ratingGrade;
    @Column(name = "ratingclass")
    private String ratingClass;
}