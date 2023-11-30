package com.ifocus.tracking.model.responses;

import com.ifocus.tracking.model.dto.UpSkillDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpSkillResponse {
    private UpSkillDTO upSkillDTO;
    private boolean areSuccessful;
    private String message;
}
