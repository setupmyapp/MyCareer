package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.SelfAppraisalDTO;
import com.ifocus.tracking.model.dto.SelfAppraisalsListDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelfAppraisalsListResponse {

    private List<SelfAppraisalsListDTO> selfAppraisalsListDTOList;
    private boolean areSuccessful;
    private String message;
}
