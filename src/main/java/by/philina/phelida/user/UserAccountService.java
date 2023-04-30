package by.philina.phelida.user;

import by.philina.phelida.user.domain.UserAccount;
import by.philina.phelida.user.exception.UserAccountNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountService implements UserDetailsService {

    private final UserAccountRepository userAccountRepository;

    @Override
    public UserAccount loadUserByUsername(String email) throws UsernameNotFoundException {
        return userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new UserAccountNotFound("Пользователь с таким email не найден."));
    }

    public Boolean existsByEmail(String email) {
        return userAccountRepository.existsByEmail(email);
    }

    public UserAccount create(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }
}
