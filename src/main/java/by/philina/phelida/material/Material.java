package by.philina.phelida.material;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "materials")
@Data
@Accessors(chain = true)
public class Material {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String name;
}
