package com.ifocus.tracking.service;

import com.ifocus.tracking.model.dto.EmployeeDTO;
import com.ifocus.tracking.util.CustomUtil;
import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ExcelService {


    @Autowired
    public ExcelService() {

    }

    public List<EmployeeDTO> parseEmployeesExcelFile(MultipartFile newEmployeesFile) throws IOException {
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();
        try (InputStream is = newEmployeesFile.getInputStream(); ReadableWorkbook wb = new ReadableWorkbook(is)) {
            Sheet sheet = wb.getFirstSheet();
            try (Stream<Row> employeeRows = sheet.openStream()) {
                employeeRows.forEach(employeeRow -> {
                    if (employeeRow.getCellText(0).equalsIgnoreCase("Employee Id") || employeeRow.getCellText(0).equalsIgnoreCase("")) {
                        return;
                    }
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO.setEmployeeId(employeeRow.getCellText(0));
                    employeeDTO.setFirstName(employeeRow.getCellText(1));
                    employeeDTO.setLastName(employeeRow.getCellText(2));
                    employeeDTO.setEmailId(employeeRow.getCellText(3));
                    employeeDTO.setContactNo(employeeRow.getCellText(4));
                    employeeDTO.setAreAM(employeeRow.getCellText(5));
                    employeeDTO.setUnderAM(employeeRow.getCellText(6));
                    employeeDTO.setMiddleName(employeeRow.getCellText(7));
                    if (employeeRow.getCellText(8) != null && !employeeRow.getCellText(8).isEmpty())
                        employeeDTO.setBirthDate(CustomUtil.getExcelEpochReference().plusDays(new BigDecimal(employeeRow.getCellText(8)).longValue()).format(CustomUtil.getGenericDateFormater()));
                    //employeeDTO.setBirthDate(employeeRow.getCellText(8));
                    employeeDTO.setDesignation(employeeRow.getCellText(9));
                    employeeDTO.setExperienceWhenJoined(employeeRow.getCellText(10));
                    employeeDTO.setExperienceBySkills(employeeRow.getCellText(11));
                    if (employeeRow.getCellText(12) != null && !employeeRow.getCellText(12).isEmpty())
                        employeeDTO.setJoiningDate(CustomUtil.getExcelEpochReference().plusDays(new BigDecimal(employeeRow.getCellText(12)).longValue()).format(CustomUtil.getGenericDateFormater()));
                    //employeeDTO.setJoiningDate(employeeRow.getCellText(12));
                    employeeDTO.setTotalExperience(employeeRow.getCellText(13));
                    if (employeeRow.getCellText(14) != null && !employeeRow.getCellText(14).isEmpty())
                        employeeDTO.setPreviousAppraisalDate(CustomUtil.getExcelEpochReference().plusDays(new BigDecimal(employeeRow.getCellText(14)).longValue()).format(CustomUtil.getGenericDateFormater()));
                    //employeeDTO.setPreviousAppraisalDate(employeeRow.getCellText(14));
                    if (employeeRow.getCellText(15) != null && !employeeRow.getCellText(15).isEmpty())
                        employeeDTO.setAppraisalDueDate(CustomUtil.getExcelEpochReference().plusDays(new BigDecimal(employeeRow.getCellText(15)).longValue()).format(CustomUtil.getGenericDateFormater()));
                    //employeeDTO.setAppraisalDueDate(employeeRow.getCellText(15));
                    employeeDTO.setBandGrade(employeeRow.getCellText(16));
                    employeeDTO.setCostCenterName(employeeRow.getCellText(17));
                    employeeDTO.setDepartmentName(employeeRow.getCellText(18));
                    employeeDTO.setAreBillable(employeeRow.getCellText(19));
                    employeeDTO.setNameRM(employeeRow.getCellText(20));
                    employeeDTO.setEmailRM(employeeRow.getCellText(21));
                    employeeDTO.setContactRM(employeeRow.getCellText(22));
                    employeeDTO.setHasHRApproved(employeeRow.getCellText(23));
                    if (employeeRow.getCellText(24) != null && !employeeRow.getCellText(24).isEmpty())
                        employeeDTO.setLastWorkingDate(CustomUtil.getExcelEpochReference().plusDays(new BigDecimal(employeeRow.getCellText(24)).longValue()).format(CustomUtil.getGenericDateFormater()));
                    //employeeDTO.setLastWorkingDate(employeeRow.getCellText(24));
                    employeeDTOList.add(employeeDTO);
                });
            }
        }
        return employeeDTOList;
    }

    /*public List<EmployeesAttendanceInfo> parseAttendanceExcelFile(MultipartFile employeeAttendanceFile) {

    }*/

}
