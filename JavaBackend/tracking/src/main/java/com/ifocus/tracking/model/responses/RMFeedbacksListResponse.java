package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.RMFeedbacksListDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RMFeedbacksListResponse {

    private List<RMFeedbacksListDTO> rmFeedbacksListDTOList;
    private boolean areSuccessful;
    private String message;
}
