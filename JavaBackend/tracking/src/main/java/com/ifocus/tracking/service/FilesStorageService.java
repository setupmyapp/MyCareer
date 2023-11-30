package com.ifocus.tracking.service;

import com.ifocus.tracking.util.CustomUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FilesStorageService {

    private static volatile FilesStorageService singleInstance = null;

    private FilesStorageService() {
        try {
            Files.createDirectories(Paths.get(CustomUtil.getEmployeesInfoDirectory()));
            Files.createDirectories(Paths.get(CustomUtil.getEmployeesAttendanceDirectory()));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public static synchronized FilesStorageService getInstance() {
        if (singleInstance == null) {
            synchronized (FilesStorageService.class) {
                singleInstance = new FilesStorageService();
            }
        }
        return singleInstance;
    }

    private String getEmployeeDPDirectory(String employeeId) {
        return "Employee" + File.separator + employeeId + File.separator + "ProfileDP";
    }

    private String getEmployeeUpSKillDirectory(String employeeId) {
        return "Employee" + File.separator + employeeId + File.separator + "UpSkill";
    }

    public String saveEmployeesInfo(MultipartFile newEmployeesFile, String dir, String generatedFileName) throws IOException {
        Files.createDirectories(Paths.get(CustomUtil.getEmployeesInfoDirectory() + File.separator + dir));
        Files.copy(newEmployeesFile.getInputStream(), Paths.get(CustomUtil.getEmployeesInfoDirectory() + File.separator + dir + File.separator).resolve(generatedFileName));
        return CustomUtil.getEmployeesInfoDirectory() + File.separator + dir + File.separator + generatedFileName;
    }

    public String saveEmployeesAttendance(MultipartFile employeeAttendanceFile, String dir, String generatedFileName) throws IOException {
        Files.createDirectories(Paths.get(CustomUtil.getEmployeesAttendanceDirectory() + File.separator + dir));
        Files.copy(employeeAttendanceFile.getInputStream(), Paths.get(CustomUtil.getEmployeesInfoDirectory() + File.separator + dir + File.separator).resolve(generatedFileName));
        return CustomUtil.getEmployeesAttendanceDirectory() + File.separator + dir + File.separator + generatedFileName;
    }

    public String saveEmployeeDP(MultipartFile employeeDPFile, String employeeId, String generatedFileName) throws IOException {
        Files.createDirectories(Paths.get(getEmployeeDPDirectory(employeeId)));
        if (new File(getEmployeeDPDirectory(employeeId) + File.separator + generatedFileName).exists())
            Files.delete(Paths.get(getEmployeeDPDirectory(employeeId) + File.separator + generatedFileName));
        Files.copy(employeeDPFile.getInputStream(), Paths.get(getEmployeeDPDirectory(employeeId) + File.separator).resolve(generatedFileName));
        return getEmployeeDPDirectory(employeeId) + File.separator + generatedFileName;
    }

    public String saveEmployeeUpSkillFeesReceipt(MultipartFile upskillFees, String employeeId) throws IOException {
        Files.createDirectories(Paths.get(getEmployeeUpSKillDirectory(employeeId)));
        if (new File(getEmployeeUpSKillDirectory(employeeId) + File.separator + upskillFees.getOriginalFilename()).exists())
            Files.delete(Paths.get(getEmployeeUpSKillDirectory(employeeId) + File.separator + upskillFees.getOriginalFilename()));
        Files.copy(upskillFees.getInputStream(), Paths.get(getEmployeeUpSKillDirectory(employeeId) + File.separator).resolve(upskillFees.getOriginalFilename()));
        return getEmployeeUpSKillDirectory(employeeId) + File.separator + upskillFees.getOriginalFilename();
    }

    public String saveEmployeeUpSkillCertificate(MultipartFile upSkillCertificate, String employeeId) throws IOException {
        Files.createDirectories(Paths.get(getEmployeeUpSKillDirectory(employeeId)));
        if (new File(getEmployeeUpSKillDirectory(employeeId) + File.separator + upSkillCertificate.getOriginalFilename()).exists())
            Files.delete(Paths.get(getEmployeeUpSKillDirectory(employeeId) + File.separator + upSkillCertificate.getOriginalFilename()));
        Files.copy(upSkillCertificate.getInputStream(), Paths.get(getEmployeeUpSKillDirectory(employeeId) + File.separator).resolve(upSkillCertificate.getOriginalFilename()));
        return getEmployeeUpSKillDirectory(employeeId) + File.separator + upSkillCertificate.getOriginalFilename();
    }

}
