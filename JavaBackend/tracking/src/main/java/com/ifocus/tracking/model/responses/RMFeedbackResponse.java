package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.RMFeedbackDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RMFeedbackResponse {

    private RMFeedbackDTO rmFeedbackDTO;
    private boolean areSuccessful;
    private String message;
}
