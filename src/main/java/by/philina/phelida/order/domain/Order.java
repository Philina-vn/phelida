package by.philina.phelida.order.domain;

import by.philina.phelida.product.domain.Product;
import by.philina.phelida.user.domain.UserAccount;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "orders")
@Data
@Accessors(chain = true)
public class Order {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = EAGER)
    private UserAccount userAccount;

    private String address;

    private Double totalPrice;

    @OneToMany
    @JoinTable(
            name = "orders_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @Enumerated(STRING)
    private OrderStatus orderStatus;
}
