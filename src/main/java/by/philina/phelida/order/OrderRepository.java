package by.philina.phelida.order;

import by.philina.phelida.order.domain.Order;
import by.philina.phelida.user.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAll();
    List<Order> findByUserAccount(UserAccount userAccount);
}
