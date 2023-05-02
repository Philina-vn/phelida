package by.philina.phelida.statistics;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "statistics")
@Getter
@Setter
@Accessors(chain = true)
public class Statistics {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private Long usersNum;
    private Long ordersNum;
    private Long productsNum;
}
