package by.philina.phelida.product.domain;

import by.philina.phelida.category.Category;
import by.philina.phelida.material.Material;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

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
    private String color;
    private Integer orderNum;
    private Integer storageNum;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "products_materials",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materials;
}
