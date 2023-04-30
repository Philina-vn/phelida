package by.philina.phelida.category;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "categories")
@Data
@Accessors(chain = true)
public class Category {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String name;
}
