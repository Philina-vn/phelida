package by.philina.phelida.user;

import by.philina.phelida.user.domain.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-accounts")
@RequiredArgsConstructor
public class UserAccountController {

    private final UserAccountService userAccountService;

    @GetMapping("/my")
    public ResponseEntity<UserAccount> getUserAccountInfo(@AuthenticationPrincipal UserAccount userAccount) {
        return ResponseEntity.ok(userAccount);
    }
}
