package by.philina.phelida.auth.dto;

import lombok.Data;

@Data
public class AuthRequestDto {
    private final String email;
    private final String password;
}
