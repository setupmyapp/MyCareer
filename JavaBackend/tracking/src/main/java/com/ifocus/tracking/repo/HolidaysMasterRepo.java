package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.HolidaysMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HolidaysMasterRepo extends JpaRepository<HolidaysMaster, Integer> {

}
