package by.philina.phelida.auth;

import by.philina.phelida.auth.dto.AuthRequestDto;
import by.philina.phelida.auth.dto.AuthResponseDto;
import by.philina.phelida.auth.dto.RegistrationRequestDto;
import by.philina.phelida.auth.exception.UserAlreadyExistsException;
import by.philina.phelida.security.JwtService;
import by.philina.phelida.statistics.StatisticsService;
import by.philina.phelida.user.UserAccountService;
import by.philina.phelida.user.domain.Role;
import by.philina.phelida.user.domain.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static by.philina.phelida.user.domain.Role.ROLE_ADMIN;
import static by.philina.phelida.user.domain.Role.ROLE_USER;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountService userAccountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final StatisticsService statisticsService;

    @Transactional
    public AuthResponseDto registerUser(RegistrationRequestDto dto) {
        if (userAccountService.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Пользователь с таким email уже существует.");
        }
        UserAccount userAccount = userAccountService.create(toUser(dto, ROLE_USER));
        statisticsService.incrementUsersNum();
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    @Transactional
    public AuthResponseDto registerAdmin(RegistrationRequestDto dto) {
        if (userAccountService.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Админ с таким email уже существует.");
        }
        UserAccount userAccount = userAccountService.create(toUser(dto, ROLE_ADMIN));
        statisticsService.incrementUsersNum();
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    public AuthResponseDto login(AuthRequestDto dto) {
        UserAccount userAccount = userAccountService.loadUserByUsername(dto.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        return new AuthResponseDto(jwtService.generateToken(userAccount));
    }

    private UserAccount toUser(RegistrationRequestDto dto, Role role) {
        return new UserAccount()
                .setName(dto.getName())
                .setSurname(dto.getSurname())
                .setEmail(dto.getEmail())
                .setPassword(passwordEncoder.encode(dto.getPassword()))
                .setRole(role);
    }
}
