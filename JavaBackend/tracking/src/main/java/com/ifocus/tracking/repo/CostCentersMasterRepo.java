package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.CostCentersMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CostCentersMasterRepo extends JpaRepository<CostCentersMaster, Integer> {

    CostCentersMaster findByCostCenterId(int costCenterId);
    CostCentersMaster findByCostCenterName(String costCenterName);
}
