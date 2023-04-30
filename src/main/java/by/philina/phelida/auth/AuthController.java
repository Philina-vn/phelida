package by.philina.phelida.auth;

import by.philina.phelida.auth.dto.AuthRequestDto;
import by.philina.phelida.auth.dto.AuthResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> registerUser(@RequestBody AuthRequestDto dto) {
        return ResponseEntity.ok(authService.registerUser(dto));
    }

    @PostMapping("/register/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthResponseDto> registerAdmin(@RequestBody AuthRequestDto dto) {
        return ResponseEntity.ok(authService.registerAdmin(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }
}
