package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.BandsMaster;
import com.ifocus.tracking.repo.BandsMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BandsMasterService {

    private final BandsMasterRepo bandsMasterRepo;

    @Autowired
    public BandsMasterService(BandsMasterRepo bandsMasterRepo){
        this.bandsMasterRepo = bandsMasterRepo;
    }

    public List<BandsMaster> findAllBands() {
        return bandsMasterRepo.findAll();
    }

    public BandsMaster findByBandId(int bandId){
        return bandsMasterRepo.findByBandId(bandId);
    }

    public BandsMaster findByGrade(String grade){
        return bandsMasterRepo.findByGrade(grade);
    }

    public BandsMaster findByExperience(int experience){
        return bandsMasterRepo.findByExperience(experience);
    }
}
