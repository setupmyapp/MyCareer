package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.CostCentersMaster;
import com.ifocus.tracking.repo.CostCentersMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CostCentersMasterService {

    private final CostCentersMasterRepo costCentersMasterRepo;

    @Autowired
    public CostCentersMasterService(CostCentersMasterRepo costCentersMasterRepo){
        this.costCentersMasterRepo = costCentersMasterRepo;
    }

    public List<CostCentersMaster> findAllCostCenters() {
        return costCentersMasterRepo.findAll();
    }

    public CostCentersMaster findByCostCenterId(int costCenterId){
        return costCentersMasterRepo.findByCostCenterId(costCenterId);
    }

    public CostCentersMaster findByCostCenterName(String costCenterName){
        return costCentersMasterRepo.findByCostCenterName(costCenterName);
    }
}
