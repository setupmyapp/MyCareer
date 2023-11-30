package com.ifocus.tracking.model.db.pkid;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Embeddable
public class EmployeesAttendancePKId implements Serializable {

    private String employeeId;
    @Column(name = "month", nullable = false)
    private int month;
    @Column(name = "year", nullable = false)
    private int year;

}
