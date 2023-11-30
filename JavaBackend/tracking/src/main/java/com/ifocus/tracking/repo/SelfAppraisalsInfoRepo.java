package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.SelfAppraisalsInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SelfAppraisalsInfoRepo extends JpaRepository<SelfAppraisalsInfo, Integer> {

    SelfAppraisalsInfo findBySelfAppraisalId(int selfAppraisalId);
}
