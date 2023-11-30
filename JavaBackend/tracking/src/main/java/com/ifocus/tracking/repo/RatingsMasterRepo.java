package com.ifocus.tracking.repo;

import com.ifocus.tracking.model.db.RatingsMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingsMasterRepo extends JpaRepository<RatingsMaster, Integer> {

    RatingsMaster findByRatingId(int ratingId);
    RatingsMaster findByRatingGrade(int ratingGrade);
    RatingsMaster findByRatingClass(String ratingClass);
}
