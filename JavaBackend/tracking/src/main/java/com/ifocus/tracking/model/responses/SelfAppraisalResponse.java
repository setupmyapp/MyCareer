package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.SelfAppraisalDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelfAppraisalResponse {

    private SelfAppraisalDTO selfAppraisalDTO;
    private boolean areSuccessful;
    private String message;
}
