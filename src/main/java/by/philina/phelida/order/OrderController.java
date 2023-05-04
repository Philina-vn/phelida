package by.philina.phelida.order;

import by.philina.phelida.order.domain.Order;
import by.philina.phelida.order.domain.OrderCreationDto;
import by.philina.phelida.user.domain.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> create(
            @RequestBody OrderCreationDto dto, @AuthenticationPrincipal UserAccount userAccount) {
        return ResponseEntity.ok(orderService.createOrder(dto, userAccount));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> findByUserAccount(@AuthenticationPrincipal UserAccount userAccount) {
        return ResponseEntity.ok(orderService.findByUser(userAccount));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> findAll() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @PostMapping("/deliver/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> deliverOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.deliverOrder(id));
    }
}
