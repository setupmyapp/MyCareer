package com.ifocus.tracking.controller.service;

import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.dto.EmployeesListDTO;
import com.ifocus.tracking.model.requests.AMEmailCredentialsRequest;
import com.ifocus.tracking.model.responses.AMEmailCredentialsResponse;
import com.ifocus.tracking.model.responses.EmployeeListResponse;
import com.ifocus.tracking.model.responses.EmployeeResponse;
import com.ifocus.tracking.service.EmployeeInfoService;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AccountManagerEndPointService {

    private final EmployeeInfoService employeeInfoService;

    public AccountManagerEndPointService(EmployeeInfoService employeeInfoService) {
        this.employeeInfoService = employeeInfoService;
    }

    public ResponseEntity<?> getMyAMEmailCredentials(String employeeId) {
        EmployeeInfo employeeInfo = employeeInfoService.findByEmployeeId(employeeId);
        if (employeeInfo != null) {
            return ResponseEntity.ok().body(new AMEmailCredentialsResponse(employeeInfo.getEmployeeId(), employeeInfo.getEmailAM(), employeeInfo.getPasswrdAM(), true, "Account Manager Credentials!!!"));
        } else {
            return ResponseEntity.badRequest().body(new AMEmailCredentialsResponse(null, null, null, false, "Employee Not Present"));
        }
    }

    public ResponseEntity<?> addAMEmailCredentials(AMEmailCredentialsRequest amEmailCredentialsRequest) {
        EmployeeInfo employeeInfo = employeeInfoService.findByEmployeeId(amEmailCredentialsRequest.getEmployeeId());
        if (employeeInfo != null) {
            try {
                employeeInfo.setEmailAM(amEmailCredentialsRequest.getEmailId());
                employeeInfo.setPasswrdAM(amEmailCredentialsRequest.getPassWrd());
                employeeInfoService.saveEmployee(employeeInfo);
                return ResponseEntity.ok().body(new AMEmailCredentialsResponse(employeeInfo.getEmployeeId(), employeeInfo.getEmailAM(), employeeInfo.getPasswrdAM(), true, "Account Manager Credentials Updated!!!"));
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body(new AMEmailCredentialsResponse(employeeInfo.getEmployeeId(), null, null, false, ex.getMessage()));
            }
        } else {
            return ResponseEntity.badRequest().body(new AMEmailCredentialsResponse(null, null, null, false, "Employee Not found!!!"));
        }
    }

    public ResponseEntity<?> getAllMyTeamMembers(String employeeId) {
        List<EmployeeInfo> employeeInfoList = employeeInfoService.findAllByUnderAM(employeeId);
        if (employeeInfoList != null && !employeeInfoList.isEmpty()) {
            List<EmployeesListDTO> employeesListDTOList = new ArrayList<>();
            for (EmployeeInfo employeeInfo : employeeInfoList) {
                employeesListDTOList.add(employeeInfoService.getEmployees(employeeInfo));
            }
            return ResponseEntity.ok().body(new EmployeeListResponse(employeesListDTOList, true, "All the Team Members Added!!!"));
        } else {
            return ResponseEntity.badRequest().body(new EmployeeListResponse(null, false, "Team Members Not found!!!"));
        }
    }

    public ResponseEntity<?> getTeamMemberProfileDetails(String employeeId) {
        EmployeeInfo employeeInfo = employeeInfoService.findByEmployeeId(employeeId);
        if (employeeInfo != null) {
            return ResponseEntity.ok().body(new EmployeeResponse(employeeInfoService.getEmployee(employeeInfo), CustomUtil.getBase64FromFile(employeeInfo.getDpFilePath()), true, "Employee Profile Details!!!"));
        } else {
            return ResponseEntity.badRequest().body(new EmployeeResponse(null, "", false, "Employee Not Present!!!"));
        }
    }
}
