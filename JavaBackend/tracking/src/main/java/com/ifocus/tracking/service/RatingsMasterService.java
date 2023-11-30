package com.ifocus.tracking.service;

import com.ifocus.tracking.model.db.CostCentersMaster;
import com.ifocus.tracking.model.db.RatingsMaster;
import com.ifocus.tracking.repo.RatingsMasterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingsMasterService {

    private final RatingsMasterRepo ratingsMasterRepo;

    @Autowired
    public RatingsMasterService(RatingsMasterRepo ratingsMasterRepo){
        this.ratingsMasterRepo = ratingsMasterRepo;
    }

    public List<RatingsMaster> findAllRatings() {
        return ratingsMasterRepo.findAll();
    }

    public RatingsMaster findByRatingId(int ratingId){
        return ratingsMasterRepo.findByRatingId(ratingId);
    }

    public RatingsMaster findByRatingGrade(int ratingGrade){
        return ratingsMasterRepo.findByRatingGrade(ratingGrade);
    }

    public RatingsMaster findByRatingClass(String ratingClass){
        return ratingsMasterRepo.findByRatingClass(ratingClass);
    }
}
