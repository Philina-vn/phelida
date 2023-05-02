package by.philina.phelida.auth.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class RegistrationRequestDto {
    private String name;
    private String surname;
    private String email;
    private String password;
}
