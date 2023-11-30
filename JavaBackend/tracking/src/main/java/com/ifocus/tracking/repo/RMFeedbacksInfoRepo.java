package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.RMFeedbacksInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RMFeedbacksInfoRepo extends JpaRepository<RMFeedbacksInfo, Integer> {

    RMFeedbacksInfo findByrmFeedbackId(int rmFeedbackId);
}
