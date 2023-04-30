package by.philina.phelida.auth;

import by.philina.phelida.auth.dto.AuthRequestDto;
import by.philina.phelida.auth.dto.AuthResponseDto;
import by.philina.phelida.auth.exception.UserAlreadyExistsException;
import by.philina.phelida.security.JwtService;
import by.philina.phelida.user.UserAccountService;
import by.philina.phelida.user.domain.Role;
import by.philina.phelida.user.domain.UserAccount;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static by.philina.phelida.user.domain.Role.ROLE_ADMIN;
import static by.philina.phelida.user.domain.Role.ROLE_USER;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountService userAccountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponseDto registerUser(AuthRequestDto dto) {
        if (userAccountService.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Пользователь с таким email уже существует.");
        }
        UserAccount userAccount = userAccountService.create(toUser(dto, ROLE_USER));
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    @Transactional
    public AuthResponseDto registerAdmin(AuthRequestDto dto) {
        if (userAccountService.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Админ с таким email уже существует.");
        }
        UserAccount userAccount = userAccountService.create(toUser(dto, ROLE_ADMIN));
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    public AuthResponseDto login(AuthRequestDto dto) {
        UserAccount userAccount = userAccountService.loadUserByUsername(dto.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    private UserAccount toUser(AuthRequestDto dto, Role role) {
        return new UserAccount()
                .setEmail(dto.getEmail())
                .setPassword(passwordEncoder.encode(dto.getPassword()))
                .setRole(role);
    }
}
