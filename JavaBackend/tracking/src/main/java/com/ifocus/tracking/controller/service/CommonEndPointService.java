package com.ifocus.tracking.controller.service;

import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.responses.AuthEmployeeDetailsResponse;
import com.ifocus.tracking.model.responses.EmployeeResponse;
import com.ifocus.tracking.service.*;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CommonEndPointService {

    private final BandsMasterService bandsMasterService;
    private final CostCentersMasterService costCentersMasterService;
    private final RatingsMasterService ratingsMasterService;
    private final DepartmentsMasterService departmentsMasterService;
    private final UpSkillTypesMasterService upSkillTypesMasterService;
    private final EmployeeInfoService employeeInfoService;
    private final HolidaysMasterService holidaysMasterService;
    private final KPIMasterService kpiMasterService;

    @Autowired
    public CommonEndPointService(BandsMasterService bandsMasterService, CostCentersMasterService costCentersMasterService,
                                 RatingsMasterService ratingsMasterService, DepartmentsMasterService departmentsMasterService,
                                 UpSkillTypesMasterService upSkillTypesMasterService, EmployeeInfoService employeeInfoService,
                                 HolidaysMasterService holidaysMasterService, KPIMasterService kpiMasterService) {
        this.bandsMasterService = bandsMasterService;
        this.costCentersMasterService = costCentersMasterService;
        this.ratingsMasterService = ratingsMasterService;
        this.departmentsMasterService = departmentsMasterService;
        this.upSkillTypesMasterService = upSkillTypesMasterService;
        this.employeeInfoService = employeeInfoService;
        this.holidaysMasterService = holidaysMasterService;
        this.kpiMasterService = kpiMasterService;
    }

    public ResponseEntity<?> getAllBands() {
        return ResponseEntity.ok(bandsMasterService.findAllBands());
    }

    public ResponseEntity<?> getAllCostCenters() {
        return ResponseEntity.ok(costCentersMasterService.findAllCostCenters());
    }

    public ResponseEntity<?> getAllRatings() {
        return ResponseEntity.ok(ratingsMasterService.findAllRatings());
    }

    public ResponseEntity<?> getAllDepartments() {
        return ResponseEntity.ok(departmentsMasterService.findAllDepartments());
    }

    public ResponseEntity<?> getAllUpSkillTypes() {
        return ResponseEntity.ok(upSkillTypesMasterService.findAllUpSkillTypes());
    }

    public ResponseEntity<?> getAllHolidaysForYear(String year){
        return ResponseEntity.ok().body("");
    }

    public ResponseEntity<?> getAllKPIs(){
        return ResponseEntity.ok(kpiMasterService.findAllKPIs());
    }

    public ResponseEntity<?> getEmployeeDetails(int userId) {
        EmployeeInfo employeeInfo = employeeInfoService.findByUserId(userId);
        if (employeeInfo != null && employeeInfo.getUserId() != 0) {
            return ResponseEntity.ok().body(new AuthEmployeeDetailsResponse(employeeInfo.getEmployeeId(), employeeInfo.getFirstName() + " "+ employeeInfo.getLastName(), String.valueOf(employeeInfo.getUserId()),true,"Employee Details!!!"));
        } else {
            return ResponseEntity.ok().body(new AuthEmployeeDetailsResponse(null,null,String.valueOf(userId),false,"No Employee found!!!"));
        }
    }
}
