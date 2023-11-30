package com.ifocus.tracking.service;

/*import com.ifocus.tracking.model.db.EmployeesAttendanceInfo;
import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.db.pkid.EmployeesAttendancePKId;
import com.ifocus.tracking.util.CustomUtil;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;*/

public class CSVService {

    /*private final EmployeeInfoService employeeInfoService;
    private final BandsMasterService bandsMasterService;
    private final CostCentersMasterService costCentersMasterService;
    private final DepartmentsMasterService departmentsMasterService;*/

    /*@Autowired
    public CSVService(EmployeeInfoService employeeInfoService, BandsMasterService bandsMasterService, CostCentersMasterService costCentersMasterService, DepartmentsMasterService departmentsMasterService) {
        this.employeeInfoService = employeeInfoService;
        this.bandsMasterService = bandsMasterService;
        this.costCentersMasterService = costCentersMasterService;
        this.departmentsMasterService = departmentsMasterService;
    }*/

    /*public List<EmployeeInfo> parseEmployeesCSVFile(MultipartFile newEmployeesFile) throws IOException, ParseException {

        BufferedReader fileReader = new BufferedReader(new InputStreamReader(newEmployeesFile.getInputStream(), "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
        List<EmployeeInfo> employeeInfoList = new ArrayList<>();
        Iterable<CSVRecord> csvRecords = csvParser.getRecords();
        for (CSVRecord csvRecord : csvRecords) {
            EmployeeInfo employeeInfo = new EmployeeInfo();
            employeeInfo.setEmployeeId(csvRecord.get("Employee Id"));
            employeeInfo.setFirstName(csvRecord.get("First Name"));
            employeeInfo.setLastName(csvRecord.get("Last Name"));
            employeeInfo.setEmailId((csvRecord.get("Email Id")));
            employeeInfo.setContactNo(csvRecord.get("Contact No"));
            employeeInfo.setAreAM(Boolean.parseBoolean(csvRecord.get("Manager")));
            if (csvRecord.get("Reporting To") != null && !csvRecord.get("Reporting To").isEmpty())
                employeeInfo.setUnderAM(csvRecord.get("Reporting To"));
            if (csvRecord.get("Middle Name") != null && !csvRecord.get("Middle Name").isEmpty())
                employeeInfo.setMiddleName(csvRecord.get("Middle Name"));
            if (csvRecord.get("DOB") != null && !csvRecord.get("DOB").isEmpty())
                employeeInfo.setBirthDate(CustomUtil.getGenericDateFormat().parse(csvRecord.get("DOB")));
            if (csvRecord.get("Designation") != null && !csvRecord.get("Designation").isEmpty())
                employeeInfo.setDesignation(csvRecord.get("Designation"));
            if (csvRecord.get("Experience When Joined") != null && !csvRecord.get("Experience When Joined").isEmpty())
                employeeInfo.setTotalExperience(Integer.parseInt(csvRecord.get("Experience When Joined")));
            if (csvRecord.get("Experience By Skills") != null && !csvRecord.get("Experience By Skills").isEmpty())
                employeeInfo.setExperienceBySkills(csvRecord.get("Experience By Skills"));
            if (csvRecord.get("DOJ") != null && !csvRecord.get("DOJ").isEmpty())
                employeeInfo.setJoiningDate(CustomUtil.getGenericDateFormat().parse(csvRecord.get("DOJ")));
            if (csvRecord.get("Total Experience") != null && !csvRecord.get("Total Experience").isEmpty())
                employeeInfo.setTotalExperience(Integer.parseInt(csvRecord.get("Total Experience")));
            if (csvRecord.get("Previous Appraisal Date") != null && !csvRecord.get("Previous Appraisal Date").isEmpty())
                employeeInfo.setPreviousAppraisalDate(CustomUtil.getGenericDateFormat().parse(csvRecord.get("Previous Appraisal Date")));
            if (csvRecord.get("Appraisal Due Date") != null && !csvRecord.get("Appraisal Due Date").isEmpty())
                employeeInfo.setAppraisalDueDate(CustomUtil.getGenericDateFormat().parse(csvRecord.get("Appraisal Due Date")));
            if (csvRecord.get("Band Grade") != null && !csvRecord.get("Band Grade").isEmpty())
                employeeInfo.setBandsMaster(bandsMasterService.findByGrade(csvRecord.get("Band Grade")));
            if (csvRecord.get("Cost Center Name") != null && !csvRecord.get("Cost Center Name").isEmpty())
                employeeInfo.setCostCentersMaster(costCentersMasterService.findByCostCenterName(csvRecord.get("costCenterName")));
            if (csvRecord.get("Department Name") != null && !csvRecord.get("Department Name").isEmpty())
                employeeInfo.setDepartmentsMaster(departmentsMasterService.findByDepartmentName(csvRecord.get("Department Name")));
            if (csvRecord.get("Billable") != null && !csvRecord.get("Billable").isEmpty())
                employeeInfo.setAreBillable(Boolean.parseBoolean(csvRecord.get("Billable")));
            if (csvRecord.get("Reporting Manager Name") != null && !csvRecord.get("Reporting Manager Name").isEmpty())
                employeeInfo.setNameRM(csvRecord.get("Reporting Manager Name"));
            if (csvRecord.get("Reporting Manager Email Id") != null && !csvRecord.get("Reporting Manager Email Id").isEmpty())
                employeeInfo.setEmailRM(csvRecord.get("Reporting Manager Email Id"));
            if (csvRecord.get("Reporting Manager Contact No") != null && !csvRecord.get("Reporting Manager Contact No").isEmpty())
                employeeInfo.setContactRM(csvRecord.get("Reporting Manager Contact No"));
            if (csvRecord.get("Approved") != null && !csvRecord.get("Approved").isEmpty())
                employeeInfo.setHasHRApproved(Boolean.parseBoolean(csvRecord.get("Approved")));
            if (csvRecord.get("LWD") != null && !csvRecord.get("LWD").isEmpty())
                employeeInfo.setLastWorkingDate(CustomUtil.getGenericDateFormat().parse(csvRecord.get("LWD")));
            employeeInfoList.add(employeeInfo);
        }

        return employeeInfoList;
    }

    public List<EmployeesAttendanceInfo> parseAttendanceCSVFile(MultipartFile employeeAttendanceFile, String filePath) throws IOException {

        BufferedReader fileReader = new BufferedReader(new InputStreamReader(employeeAttendanceFile.getInputStream(), "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
        List<EmployeesAttendanceInfo> employeeAttendanceInfoList = new ArrayList<>();
        Iterable<CSVRecord> csvRecords = csvParser.getRecords();
        for (CSVRecord csvRecord : csvRecords) {
            EmployeesAttendanceInfo employeeAttendanceInfo = new EmployeesAttendanceInfo();
            employeeAttendanceInfo.setEmployeesAttendancePKId(new EmployeesAttendancePKId(csvRecord.get("employeeId"), Integer.parseInt(csvRecord.get("month")), Integer.parseInt(csvRecord.get("year"))));
            employeeAttendanceInfo.setEmployeeInfo(employeeInfoService.findByEmployeeId(csvRecord.get("employeeId")));
            employeeAttendanceInfo.setTotalDaysInMonth(Float.parseFloat(csvRecord.get("totalDaysInMonth")));
            employeeAttendanceInfo.setTotalWorkableDays(Float.parseFloat(csvRecord.get("totalWorkableDays")));
            if (csvRecord.get("attendancePresent") != null && !csvRecord.get("attendancePresent").isEmpty())
                employeeAttendanceInfo.setAttendancePresent(csvRecord.get("attendancePresent"));
            if (csvRecord.get("attendanceAbsent") != null && !csvRecord.get("attendanceAbsent").isEmpty())
                employeeAttendanceInfo.setAttendanceAbsent(csvRecord.get("attendanceAbsent"));
            if (csvRecord.get("gazettedHolidaysTaken") != null && !csvRecord.get("gazettedHolidaysTaken").isEmpty())
                employeeAttendanceInfo.setGazettedHolidaysTaken(csvRecord.get("gazettedHolidaysTaken"));
            if (csvRecord.get("restrictedHolidaysTaken") != null && !csvRecord.get("restrictedHolidaysTaken").isEmpty())
                employeeAttendanceInfo.setRestrictedHolidaysTaken(csvRecord.get("restrictedHolidaysTaken"));
            employeeAttendanceInfoList.add(employeeAttendanceInfo);
        }
        return employeeAttendanceInfoList;
    }*/
}
