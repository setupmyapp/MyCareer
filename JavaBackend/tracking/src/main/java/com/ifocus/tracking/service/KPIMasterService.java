package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.KPIMaster;
import com.ifocus.tracking.repo.KPIMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KPIMasterService {

    private final KPIMasterRepo kpiMasterRepo;

    @Autowired
    public KPIMasterService(KPIMasterRepo kpiMasterRepo){
        this.kpiMasterRepo = kpiMasterRepo;
    }

    public List<KPIMaster> findAllKPIs() {
        return kpiMasterRepo.findAll();
    }
}
