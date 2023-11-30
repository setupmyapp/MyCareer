package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.EmployeeInfo;
import com.ifocus.tracking.model.dto.EmployeeDTO;
import com.ifocus.tracking.model.dto.EmployeesListDTO;
import com.ifocus.tracking.repo.EmployeeInfoRepo;
import com.ifocus.tracking.util.CustomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@Service
public class EmployeeInfoService {

    private final EmployeeInfoRepo employeeInfoRepo;
    private final BandsMasterService bandsMasterService;
    private final DepartmentsMasterService departmentsMasterService;
    private final CostCentersMasterService costCentersMasterService;

    @Autowired
    public EmployeeInfoService(EmployeeInfoRepo employeeInfoRepo, BandsMasterService bandsMasterService, DepartmentsMasterService departmentsMasterService, CostCentersMasterService costCentersMasterService) {
        this.employeeInfoRepo = employeeInfoRepo;
        this.bandsMasterService = bandsMasterService;
        this.departmentsMasterService = departmentsMasterService;
        this.costCentersMasterService = costCentersMasterService;
    }

    public EmployeeInfo createEmployee(EmployeeDTO employeeDTO, String userId, MultipartFile employeeDPFile) throws ParseException, IOException, NullPointerException {
        employeeDTO.setUserId(userId);
        EmployeeInfo employeeInfo = mapEmployeeDTO2EmployeeInfo(employeeDTO, null);
        if (employeeDPFile != null && !employeeDPFile.isEmpty())
            employeeInfo.setDpFilePath(FilesStorageService.getInstance().saveEmployeeDP(employeeDPFile, employeeInfo.getEmployeeId(), employeeInfo.getFirstName() + employeeDPFile.getOriginalFilename().substring(employeeDPFile.getOriginalFilename().lastIndexOf("."))));
        return employeeInfo;
    }


    public EmployeeInfo editEmployee(EmployeeDTO employeeDTO, MultipartFile employeeDPFile) throws ParseException, IOException, NullPointerException {
        EmployeeInfo employeeInfo = mapEmployeeDTO2EmployeeInfo(employeeDTO, findByEmployeeId(employeeDTO.getEmployeeId()));
        if (employeeDPFile != null && !employeeDPFile.isEmpty())
            employeeInfo.setDpFilePath(FilesStorageService.getInstance().saveEmployeeDP(employeeDPFile, employeeInfo.getEmployeeId(), employeeInfo.getFirstName() + employeeDPFile.getOriginalFilename().substring(employeeDPFile.getOriginalFilename().lastIndexOf("."))));
        return employeeInfo;
    }

    public EmployeeDTO getEmployee(EmployeeInfo employeeInfo) {
        return mapEmployeeInfo2EmployeeDTO(employeeInfo, null);
    }

    public EmployeesListDTO getEmployees(EmployeeInfo employeeInfo) {
        return mapEmployeeInfo2EmployeesListDTO(employeeInfo, null);
    }

    private EmployeeInfo mapEmployeeDTO2EmployeeInfo(EmployeeDTO sourceEmployeeDTO, EmployeeInfo targetEmployeeInfo) throws ParseException {
        if (targetEmployeeInfo == null) {
            targetEmployeeInfo = new EmployeeInfo();
            targetEmployeeInfo.setEmployeeId(sourceEmployeeDTO.getEmployeeId());
            targetEmployeeInfo.setUserId(Integer.parseInt(sourceEmployeeDTO.getUserId()));
        }
        if (sourceEmployeeDTO.getFirstName() != null && !sourceEmployeeDTO.getFirstName().isEmpty())
            targetEmployeeInfo.setFirstName(sourceEmployeeDTO.getFirstName());
        if (sourceEmployeeDTO.getMiddleName() != null && !sourceEmployeeDTO.getMiddleName().isEmpty())
            targetEmployeeInfo.setMiddleName(sourceEmployeeDTO.getMiddleName());
        if (sourceEmployeeDTO.getLastName() != null && !sourceEmployeeDTO.getLastName().isEmpty())
            targetEmployeeInfo.setLastName(sourceEmployeeDTO.getLastName());
        if (sourceEmployeeDTO.getEmailId() != null && !sourceEmployeeDTO.getEmailId().isEmpty())
            targetEmployeeInfo.setEmailId(sourceEmployeeDTO.getEmailId());
        if (sourceEmployeeDTO.getContactNo() != null && !sourceEmployeeDTO.getContactNo().isEmpty())
            targetEmployeeInfo.setContactNo(sourceEmployeeDTO.getContactNo());
        if (targetEmployeeInfo.getBirthDate() != null && !sourceEmployeeDTO.getBirthDate().isEmpty())
            targetEmployeeInfo.setBirthDate(CustomUtil.getGenericDateFormat().parse(sourceEmployeeDTO.getBirthDate()));
        if (sourceEmployeeDTO.getDesignation() != null && !sourceEmployeeDTO.getDesignation().isEmpty())
            targetEmployeeInfo.setDesignation(sourceEmployeeDTO.getDesignation());
        if (sourceEmployeeDTO.getExperienceWhenJoined() != null && !sourceEmployeeDTO.getExperienceWhenJoined().isEmpty())
            targetEmployeeInfo.setExperienceWhenJoined(Integer.parseInt(sourceEmployeeDTO.getExperienceWhenJoined()));
        if (sourceEmployeeDTO.getExperienceBySkills() != null && !sourceEmployeeDTO.getExperienceBySkills().isEmpty())
            targetEmployeeInfo.setExperienceBySkills(sourceEmployeeDTO.getExperienceBySkills());
        if (sourceEmployeeDTO.getJoiningDate() != null && !sourceEmployeeDTO.getJoiningDate().isEmpty())
            targetEmployeeInfo.setJoiningDate(CustomUtil.getGenericDateFormat().parse(sourceEmployeeDTO.getJoiningDate()));
        if (sourceEmployeeDTO.getLastWorkingDate() != null && !sourceEmployeeDTO.getLastWorkingDate().isEmpty())
            targetEmployeeInfo.setLastWorkingDate(CustomUtil.getGenericDateFormat().parse(sourceEmployeeDTO.getLastWorkingDate()));
        if (sourceEmployeeDTO.getTotalExperience() != null && !sourceEmployeeDTO.getTotalExperience().isEmpty())
            targetEmployeeInfo.setTotalExperience(Integer.parseInt(sourceEmployeeDTO.getTotalExperience()));
        if (sourceEmployeeDTO.getPreviousAppraisalDate() != null && !sourceEmployeeDTO.getPreviousAppraisalDate().isEmpty())
            targetEmployeeInfo.setPreviousAppraisalDate(CustomUtil.getGenericDateFormat().parse(sourceEmployeeDTO.getPreviousAppraisalDate()));
        if (sourceEmployeeDTO.getAppraisalDueDate() != null && !sourceEmployeeDTO.getAppraisalDueDate().isEmpty())
            targetEmployeeInfo.setAppraisalDueDate(CustomUtil.getGenericDateFormat().parse(sourceEmployeeDTO.getAppraisalDueDate()));
        if (sourceEmployeeDTO.getBandGrade() != null && !sourceEmployeeDTO.getBandGrade().isEmpty())
            targetEmployeeInfo.setBandsMaster(bandsMasterService.findByGrade(sourceEmployeeDTO.getBandGrade()));
        if (sourceEmployeeDTO.getCostCenterName() != null && !sourceEmployeeDTO.getCostCenterName().isEmpty())
            targetEmployeeInfo.setCostCentersMaster(costCentersMasterService.findByCostCenterName(sourceEmployeeDTO.getCostCenterName()));
        if (sourceEmployeeDTO.getDepartmentName() != null && !sourceEmployeeDTO.getDepartmentName().isEmpty())
            targetEmployeeInfo.setDepartmentsMaster(departmentsMasterService.findByDepartmentName(sourceEmployeeDTO.getDepartmentName()));
        if (sourceEmployeeDTO.getNameRM() != null && !sourceEmployeeDTO.getNameRM().isEmpty())
            targetEmployeeInfo.setNameRM(sourceEmployeeDTO.getNameRM());
        if (sourceEmployeeDTO.getEmailRM() != null && !sourceEmployeeDTO.getEmailRM().isEmpty())
            targetEmployeeInfo.setEmailRM(sourceEmployeeDTO.getEmailRM());
        if (sourceEmployeeDTO.getContactRM() != null && !sourceEmployeeDTO.getContactRM().isEmpty())
            targetEmployeeInfo.setContactRM(sourceEmployeeDTO.getContactRM());
        if (sourceEmployeeDTO.getAreAM() != null && !sourceEmployeeDTO.getAreAM().isEmpty())
            targetEmployeeInfo.setAreAM(Boolean.parseBoolean(sourceEmployeeDTO.getAreAM()));
        if (sourceEmployeeDTO.getEmailAM() != null && !sourceEmployeeDTO.getEmailAM().isEmpty())
            targetEmployeeInfo.setEmailAM(sourceEmployeeDTO.getEmailAM());
        if (sourceEmployeeDTO.getPasswrdAM() != null && !sourceEmployeeDTO.getPasswrdAM().isEmpty())
            targetEmployeeInfo.setPasswrdAM(sourceEmployeeDTO.getPasswrdAM());
        if (sourceEmployeeDTO.getUnderAM() != null && !sourceEmployeeDTO.getUnderAM().isEmpty())
            targetEmployeeInfo.setUnderAM(sourceEmployeeDTO.getUnderAM());
        if (sourceEmployeeDTO.getHasHRApproved() != null && !sourceEmployeeDTO.getHasHRApproved().isEmpty())
            targetEmployeeInfo.setHasHRApproved(Boolean.parseBoolean(sourceEmployeeDTO.getHasHRApproved()));
        if (sourceEmployeeDTO.getAreBillable() != null && !sourceEmployeeDTO.getAreBillable().isEmpty())
            targetEmployeeInfo.setAreBillable(Boolean.parseBoolean(sourceEmployeeDTO.getAreBillable()));
        if (sourceEmployeeDTO.getKpiDetails() != null && !sourceEmployeeDTO.getKpiDetails().isEmpty())
            targetEmployeeInfo.setKpiDetails(sourceEmployeeDTO.getKpiDetails());

        return targetEmployeeInfo;
    }

    private EmployeeDTO mapEmployeeInfo2EmployeeDTO(EmployeeInfo sourceEmployeeInfo, EmployeeDTO targetEmployeeDTO) {
        if (targetEmployeeDTO == null)
            targetEmployeeDTO = new EmployeeDTO();
        targetEmployeeDTO.setEmployeeId(sourceEmployeeInfo.getEmployeeId());
        targetEmployeeDTO.setUserId(String.valueOf(sourceEmployeeInfo.getUserId()));
        targetEmployeeDTO.setFirstName(sourceEmployeeInfo.getFirstName());
        if (sourceEmployeeInfo.getMiddleName() != null && !sourceEmployeeInfo.getMiddleName().isEmpty())
            targetEmployeeDTO.setMiddleName(sourceEmployeeInfo.getMiddleName());
        targetEmployeeDTO.setLastName(sourceEmployeeInfo.getLastName());
        targetEmployeeDTO.setEmailId(sourceEmployeeInfo.getEmailId());
        targetEmployeeDTO.setContactNo(sourceEmployeeInfo.getContactNo());
        if (sourceEmployeeInfo.getBirthDate() != null)
            targetEmployeeDTO.setBirthDate(CustomUtil.getGenericDateFormat().format(sourceEmployeeInfo.getBirthDate()));
        if (sourceEmployeeInfo.getDpFilePath() != null && !sourceEmployeeInfo.getDpFilePath().isEmpty())
            targetEmployeeDTO.setDpFilePath(sourceEmployeeInfo.getDpFilePath());
        if (sourceEmployeeInfo.getDesignation() != null && !sourceEmployeeInfo.getDesignation().isEmpty())
            targetEmployeeDTO.setDesignation(sourceEmployeeInfo.getDesignation());
        targetEmployeeDTO.setExperienceWhenJoined(String.valueOf(sourceEmployeeInfo.getExperienceWhenJoined()));
        if (sourceEmployeeInfo.getExperienceBySkills() != null && !sourceEmployeeInfo.getExperienceBySkills().isEmpty())
            targetEmployeeDTO.setExperienceBySkills(sourceEmployeeInfo.getExperienceBySkills());
        if (sourceEmployeeInfo.getJoiningDate() != null)
            targetEmployeeDTO.setJoiningDate(CustomUtil.getGenericDateFormat().format(sourceEmployeeInfo.getJoiningDate()));
        if (sourceEmployeeInfo.getLastWorkingDate() != null)
            targetEmployeeDTO.setLastWorkingDate(CustomUtil.getGenericDateFormat().format(sourceEmployeeInfo.getLastWorkingDate()));
        targetEmployeeDTO.setTotalExperience(String.valueOf(sourceEmployeeInfo.getTotalExperience()));
        if (sourceEmployeeInfo.getPreviousAppraisalDate() != null)
            targetEmployeeDTO.setPreviousAppraisalDate(CustomUtil.getGenericDateFormat().format(sourceEmployeeInfo.getPreviousAppraisalDate()));
        if (sourceEmployeeInfo.getAppraisalDueDate() != null)
            targetEmployeeDTO.setAppraisalDueDate(CustomUtil.getGenericDateFormat().format(sourceEmployeeInfo.getAppraisalDueDate()));
        if (sourceEmployeeInfo.getBandsMaster() != null)
            targetEmployeeDTO.setBandGrade(sourceEmployeeInfo.getBandsMaster().getGrade());
        if (sourceEmployeeInfo.getCostCentersMaster() != null)
            targetEmployeeDTO.setCostCenterName(sourceEmployeeInfo.getCostCentersMaster().getCostCenterName());
        if (sourceEmployeeInfo.getDepartmentsMaster() != null)
            targetEmployeeDTO.setDepartmentName(sourceEmployeeInfo.getDepartmentsMaster().getDepartmentName());
        if (sourceEmployeeInfo.getNameRM() != null && !sourceEmployeeInfo.getNameRM().isEmpty())
            targetEmployeeDTO.setNameRM(sourceEmployeeInfo.getNameRM());
        if (sourceEmployeeInfo.getEmailRM() != null && !sourceEmployeeInfo.getEmailRM().isEmpty())
            targetEmployeeDTO.setEmailRM(sourceEmployeeInfo.getEmailRM());
        if (sourceEmployeeInfo.getContactRM() != null && !sourceEmployeeInfo.getContactRM().isEmpty())
            targetEmployeeDTO.setContactRM(sourceEmployeeInfo.getContactRM());
        targetEmployeeDTO.setAreAM(String.valueOf(sourceEmployeeInfo.isAreAM()));
        if (sourceEmployeeInfo.getEmailAM() != null && !sourceEmployeeInfo.getEmailAM().isEmpty())
            targetEmployeeDTO.setEmailAM(sourceEmployeeInfo.getEmailAM());
        if (sourceEmployeeInfo.getPasswrdAM() != null && !sourceEmployeeInfo.getPasswrdAM().isEmpty())
            targetEmployeeDTO.setPasswrdAM(sourceEmployeeInfo.getPasswrdAM());
        if (sourceEmployeeInfo.isAreAM())
            targetEmployeeDTO.setTMUnderAM(String.valueOf(countByUnderAM(sourceEmployeeInfo.getEmployeeId())));
        if (sourceEmployeeInfo.getUnderAM() != null && !sourceEmployeeInfo.getUnderAM().isEmpty())
            targetEmployeeDTO.setUnderAM(sourceEmployeeInfo.getUnderAM());
        targetEmployeeDTO.setHasHRApproved(String.valueOf(sourceEmployeeInfo.isHasHRApproved()));
        targetEmployeeDTO.setAreBillable(String.valueOf(sourceEmployeeInfo.isAreBillable()));
        if (sourceEmployeeInfo.getKpiDetails() != null && !sourceEmployeeInfo.getKpiDetails().isEmpty())
            targetEmployeeDTO.setKpiDetails(sourceEmployeeInfo.getKpiDetails());

        return targetEmployeeDTO;
    }

    private EmployeesListDTO mapEmployeeInfo2EmployeesListDTO(EmployeeInfo sourceEmployeeInfo, EmployeesListDTO targetEmployeesListDTO) {
        if (targetEmployeesListDTO == null) {
            targetEmployeesListDTO = new EmployeesListDTO();
        }
        targetEmployeesListDTO.setEmployeeId(sourceEmployeeInfo.getEmployeeId());
        targetEmployeesListDTO.setFirstName(sourceEmployeeInfo.getFirstName());
        targetEmployeesListDTO.setLastName(sourceEmployeeInfo.getLastName());
        targetEmployeesListDTO.setEmailId(sourceEmployeeInfo.getEmailId());
        targetEmployeesListDTO.setContactNo(sourceEmployeeInfo.getContactNo());
        targetEmployeesListDTO.setAreAM(String.valueOf(sourceEmployeeInfo.isAreAM()));
        targetEmployeesListDTO.setHasHRApproved(String.valueOf(sourceEmployeeInfo.isHasHRApproved()));
        targetEmployeesListDTO.setAreBillable(String.valueOf(sourceEmployeeInfo.isAreBillable()));

        return targetEmployeesListDTO;
    }

    public List<EmployeeInfo> findAll() {
        return employeeInfoRepo.findAll();
    }

    public List<EmployeeInfo> findAllByUnderAM(String employeeId) {
        return employeeInfoRepo.findAllByUnderAM(employeeId);
    }

    public int countByUnderAM(String employeeId) {
        return employeeInfoRepo.countByUnderAM(employeeId);
    }

    public EmployeeInfo findByEmployeeId(String employeeId) {
        return employeeInfoRepo.findByEmployeeId(employeeId);
    }

    public EmployeeInfo findByUserId(int userId) {
        return employeeInfoRepo.findByUserId(userId);
    }

    public EmployeeInfo saveEmployee(EmployeeInfo employeeInfo) throws Exception {
        return employeeInfoRepo.save(employeeInfo);
    }
}
