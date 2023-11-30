package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.DepartmentsMaster;
import com.ifocus.tracking.model.db.RatingsMaster;
import com.ifocus.tracking.repo.DepartmentsMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentsMasterService {

    private final DepartmentsMasterRepo departmentsMasterRepo;

    @Autowired
    public DepartmentsMasterService(DepartmentsMasterRepo departmentsMasterRepo) {
        this.departmentsMasterRepo = departmentsMasterRepo;
    }

    public List<DepartmentsMaster> findAllDepartments() {
        return departmentsMasterRepo.findAll();
    }

    public DepartmentsMaster findByDepartmentId(int departmentId) {
        return departmentsMasterRepo.findByDepartmentId(departmentId);
    }
    public DepartmentsMaster findByDepartmentName(String departmentName) {
        return departmentsMasterRepo.findByDepartmentName(departmentName);
    }
}
