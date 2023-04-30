package by.philina.phelida.product.domain;

import by.philina.phelida.category.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "products")
@Data
@Accessors(chain = true)
public class Product {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Category category;
    private Double price;
    private Integer orderNum;
}
