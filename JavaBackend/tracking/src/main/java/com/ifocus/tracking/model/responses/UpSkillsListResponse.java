package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.UpSkillsListDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpSkillsListResponse {
    private List<UpSkillsListDTO> upSkillsListDTOList;
    private boolean areSuccessful;
    private String message;
}
