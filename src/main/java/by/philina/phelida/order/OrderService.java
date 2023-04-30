package by.philina.phelida.order;

import by.philina.phelida.order.domain.Order;
import by.philina.phelida.order.domain.OrderCreationDto;
import by.philina.phelida.order.exception.OrderNotFound;
import by.philina.phelida.product.ProductService;
import by.philina.phelida.user.domain.UserAccount;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static by.philina.phelida.order.domain.OrderStatus.DELIVERED;
import static by.philina.phelida.order.domain.OrderStatus.REGISTERED;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order createOrder(OrderCreationDto dto, UserAccount userAccount) {
        Order order = new Order()
                .setUserAccount(userAccount)
                .setProducts(
                      dto.getProductIds().stream()
                              .map(productService::findById)
                              .toList()
                )
                .setOrderStatus(REGISTERED);
        return orderRepository.save(order);
    }

    public Order deliverOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFound("Заказ с таким ID не найден"))
                .setOrderStatus(DELIVERED);
        return orderRepository.save(order);
    }
}
