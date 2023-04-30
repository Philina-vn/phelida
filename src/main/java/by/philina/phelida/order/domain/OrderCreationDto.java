package by.philina.phelida.order.domain;

import lombok.Data;

import java.util.List;

@Data
public class OrderCreationDto {
    private List<Long> productIds;
}
