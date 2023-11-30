package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.EmployeesAttendanceInfo;
import com.ifocus.tracking.model.db.pkid.EmployeesAttendancePKId;
import com.ifocus.tracking.model.dto.EmployeeAttendanceDTO;
import com.ifocus.tracking.model.dto.EmployeesAttendanceListDTO;
import com.ifocus.tracking.repo.EmployeesAttendanceInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesAttendanceInfoService {

    private final EmployeesAttendanceInfoRepo employeesAttendanceInfoRepo;
    private final EmployeeInfoService employeeInfoService;

    @Autowired
    public EmployeesAttendanceInfoService(EmployeesAttendanceInfoRepo employeesAttendanceInfoRepo, EmployeeInfoService employeeInfoService) {
        this.employeesAttendanceInfoRepo = employeesAttendanceInfoRepo;
        this.employeeInfoService = employeeInfoService;
    }

    public EmployeesAttendanceInfo createEmployeesAttendance(EmployeeAttendanceDTO employeeAttendanceDTO) {
        return mapEmployeeAttendanceDTO2EmployeesAttendanceInfo(employeeAttendanceDTO, null);
    }

    public EmployeesAttendanceInfo editEmployeesAttendance(EmployeeAttendanceDTO employeeAttendanceDTO) {
        return mapEmployeeAttendanceDTO2EmployeesAttendanceInfo(employeeAttendanceDTO, findByEmployeesAttendancePKId(new EmployeesAttendancePKId(employeeAttendanceDTO.getEmployeeId(), Integer.parseInt(employeeAttendanceDTO.getYear()), Integer.parseInt(employeeAttendanceDTO.getMonth()))));
    }

    public EmployeeAttendanceDTO getEmployeeAttendance(EmployeesAttendanceInfo employeesAttendanceInfo) {
        return mapEmployeesAttendanceInfo2EmployeeAttendanceDTO(employeesAttendanceInfo, null);
    }

    public EmployeesAttendanceListDTO getEmployeesAttendance(EmployeesAttendanceInfo employeesAttendanceInfo) {
        return mapEmployeesAttendanceInfo2EmployeesAttendanceListDTO(employeesAttendanceInfo, null);
    }

    private EmployeesAttendanceInfo mapEmployeeAttendanceDTO2EmployeesAttendanceInfo(EmployeeAttendanceDTO sourceEmployeeAttendanceDTO, EmployeesAttendanceInfo targetEmployeesAttendanceInfo) {
        if (targetEmployeesAttendanceInfo == null) {
            targetEmployeesAttendanceInfo = new EmployeesAttendanceInfo();
            targetEmployeesAttendanceInfo.setEmployeesAttendancePKId(new EmployeesAttendancePKId(sourceEmployeeAttendanceDTO.getEmployeeId(), Integer.parseInt(sourceEmployeeAttendanceDTO.getYear()), Integer.parseInt(sourceEmployeeAttendanceDTO.getMonth())));
            targetEmployeesAttendanceInfo.setEmployeeInfo(employeeInfoService.findByEmployeeId(sourceEmployeeAttendanceDTO.getEmployeeId()));
        }
        if (sourceEmployeeAttendanceDTO.getTotalDaysInMonth() != null && !sourceEmployeeAttendanceDTO.getTotalDaysInMonth().isEmpty())
            targetEmployeesAttendanceInfo.setTotalDaysInMonth(Long.parseLong(sourceEmployeeAttendanceDTO.getTotalDaysInMonth()));
        if (sourceEmployeeAttendanceDTO.getTotalWorkableDays() != null && !sourceEmployeeAttendanceDTO.getTotalWorkableDays().isEmpty())
            targetEmployeesAttendanceInfo.setTotalWorkableDays(Long.parseLong(sourceEmployeeAttendanceDTO.getTotalWorkableDays()));
        if (sourceEmployeeAttendanceDTO.getAttendancePresent() != null && !sourceEmployeeAttendanceDTO.getAttendancePresent().isEmpty())
            targetEmployeesAttendanceInfo.setAttendancePresent(sourceEmployeeAttendanceDTO.getAttendancePresent());
        if (sourceEmployeeAttendanceDTO.getAttendanceAbsent() != null && !sourceEmployeeAttendanceDTO.getAttendanceAbsent().isEmpty())
            targetEmployeesAttendanceInfo.setAttendanceAbsent(sourceEmployeeAttendanceDTO.getAttendanceAbsent());
        if (sourceEmployeeAttendanceDTO.getGazettedHolidaysTaken() != null && !sourceEmployeeAttendanceDTO.getGazettedHolidaysTaken().isEmpty())
            targetEmployeesAttendanceInfo.setGazettedHolidaysTaken(sourceEmployeeAttendanceDTO.getGazettedHolidaysTaken());
        if (sourceEmployeeAttendanceDTO.getRestrictedHolidaysTaken() != null && !sourceEmployeeAttendanceDTO.getRestrictedHolidaysTaken().isEmpty())
            targetEmployeesAttendanceInfo.setRestrictedHolidaysTaken(sourceEmployeeAttendanceDTO.getRestrictedHolidaysTaken());

        return targetEmployeesAttendanceInfo;
    }

    private EmployeeAttendanceDTO mapEmployeesAttendanceInfo2EmployeeAttendanceDTO(EmployeesAttendanceInfo sourceEmployeesAttendanceInfo, EmployeeAttendanceDTO targetEmployeeAttendanceDTO) {
        if (targetEmployeeAttendanceDTO == null)
            targetEmployeeAttendanceDTO = new EmployeeAttendanceDTO();
        targetEmployeeAttendanceDTO.setEmployeeId(sourceEmployeesAttendanceInfo.getEmployeeInfo().getEmployeeId());
        targetEmployeeAttendanceDTO.setEmployeeName(sourceEmployeesAttendanceInfo.getEmployeeInfo().getFirstName() + " " + sourceEmployeesAttendanceInfo.getEmployeeInfo().getLastName());
        targetEmployeeAttendanceDTO.setYear(String.valueOf(sourceEmployeesAttendanceInfo.getEmployeesAttendancePKId().getYear()));
        targetEmployeeAttendanceDTO.setMonth(String.valueOf(sourceEmployeesAttendanceInfo.getEmployeesAttendancePKId().getMonth()));
        targetEmployeeAttendanceDTO.setTotalDaysInMonth(String.valueOf(sourceEmployeesAttendanceInfo.getTotalDaysInMonth()));
        targetEmployeeAttendanceDTO.setTotalWorkableDays(String.valueOf(sourceEmployeesAttendanceInfo.getTotalWorkableDays()));
        if (sourceEmployeesAttendanceInfo.getAttendancePresent() != null && !sourceEmployeesAttendanceInfo.getAttendancePresent().isEmpty())
            targetEmployeeAttendanceDTO.setAttendancePresent(sourceEmployeesAttendanceInfo.getAttendancePresent());
        if (sourceEmployeesAttendanceInfo.getAttendanceAbsent() != null && !sourceEmployeesAttendanceInfo.getAttendanceAbsent().isEmpty())
            targetEmployeeAttendanceDTO.setAttendanceAbsent(sourceEmployeesAttendanceInfo.getAttendanceAbsent());
        if (sourceEmployeesAttendanceInfo.getGazettedHolidaysTaken() != null && !sourceEmployeesAttendanceInfo.getGazettedHolidaysTaken().isEmpty())
            targetEmployeeAttendanceDTO.setGazettedHolidaysTaken(sourceEmployeesAttendanceInfo.getGazettedHolidaysTaken());
        if (sourceEmployeesAttendanceInfo.getRestrictedHolidaysTaken() != null && !sourceEmployeesAttendanceInfo.getRestrictedHolidaysTaken().isEmpty())
            targetEmployeeAttendanceDTO.setGazettedHolidaysTaken(sourceEmployeesAttendanceInfo.getRestrictedHolidaysTaken());

        return targetEmployeeAttendanceDTO;
    }

    private EmployeesAttendanceListDTO mapEmployeesAttendanceInfo2EmployeesAttendanceListDTO(EmployeesAttendanceInfo sourceEmployeesAttendanceInfo, EmployeesAttendanceListDTO targetEmployeesAttendanceListDTO) {
        if (targetEmployeesAttendanceListDTO == null)
            targetEmployeesAttendanceListDTO = new EmployeesAttendanceListDTO();
        targetEmployeesAttendanceListDTO.setEmployeeId(sourceEmployeesAttendanceInfo.getEmployeeInfo().getEmployeeId());
        targetEmployeesAttendanceListDTO.setEmployeeName(sourceEmployeesAttendanceInfo.getEmployeeInfo().getFirstName() + " " + sourceEmployeesAttendanceInfo.getEmployeeInfo().getLastName());
        targetEmployeesAttendanceListDTO.setYear(String.valueOf(sourceEmployeesAttendanceInfo.getEmployeesAttendancePKId().getYear()));
        targetEmployeesAttendanceListDTO.setMonth(String.valueOf(sourceEmployeesAttendanceInfo.getEmployeesAttendancePKId().getMonth()));

        return targetEmployeesAttendanceListDTO;
    }

    public List<EmployeesAttendanceInfo> findAllEmployeesAttendance() {
        return employeesAttendanceInfoRepo.findAll();
    }

    public EmployeesAttendanceInfo findByEmployeesAttendancePKId(EmployeesAttendancePKId employeesAttendancePKId) {
        return employeesAttendanceInfoRepo.findByEmployeesAttendancePKId(employeesAttendancePKId);
    }

    public EmployeesAttendanceInfo saveEmployeeAttendance(EmployeesAttendanceInfo employeesAttendanceInfo) {
        return employeesAttendanceInfoRepo.save(employeesAttendanceInfo);
    }

    public List<EmployeesAttendanceInfo> saveEmployeeAttendance(List<EmployeesAttendanceInfo> employeeAttendanceInfoList) {
        return employeesAttendanceInfoRepo.saveAll(employeeAttendanceInfoList);
    }
}
