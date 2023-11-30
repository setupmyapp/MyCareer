package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.BandsMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BandsMasterRepo extends JpaRepository<BandsMaster, Integer> {

    BandsMaster findByBandId(int bandId);
    BandsMaster findByGrade(String grade);
    BandsMaster findByExperience(int experience);
}
