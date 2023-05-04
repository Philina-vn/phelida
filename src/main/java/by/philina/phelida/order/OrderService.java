package by.philina.phelida.order;

import by.philina.phelida.order.domain.Order;
import by.philina.phelida.order.domain.OrderCreationDto;
import by.philina.phelida.order.exception.OrderNotFound;
import by.philina.phelida.product.ProductService;
import by.philina.phelida.statistics.StatisticsService;
import by.philina.phelida.user.domain.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static by.philina.phelida.order.domain.OrderStatus.DELIVERED;
import static by.philina.phelida.order.domain.OrderStatus.REGISTERED;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final StatisticsService statisticsService;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findByUser(UserAccount userAccount) {
        return orderRepository.findByUserAccount(userAccount);
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
                .setAddress(dto.getAddress())
                .setTotalPrice(dto.getTotalPrice())
                .setOrderStatus(REGISTERED);
        updateStorageNumber(dto);
        statisticsService.incrementOrdersNum();
        return orderRepository.save(order);
    }

    private void updateStorageNumber(OrderCreationDto dto) {
        dto.getProductIds().stream()
                .collect(Collectors.groupingBy(i -> i, Collectors.counting()))
                .forEach((key, value) -> productService.decrementStorageNum(key, value.intValue()));
    }

    public Order deliverOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFound("Заказ с таким ID не найден"))
                .setOrderStatus(DELIVERED);
        return orderRepository.save(order);
    }
}
