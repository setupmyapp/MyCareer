package com.ifocus.tracking.service;


import com.ifocus.tracking.repo.EmployeesAttendanceInfoRepo;
import com.ifocus.tracking.repo.HolidaysMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HolidaysMasterService {

    private final HolidaysMasterRepo holidaysMasterRepo;

    @Autowired
    public HolidaysMasterService(HolidaysMasterRepo holidaysMasterRepo){
        this.holidaysMasterRepo = holidaysMasterRepo;
    }
}
