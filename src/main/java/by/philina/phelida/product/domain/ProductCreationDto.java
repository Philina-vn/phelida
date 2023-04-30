package by.philina.phelida.product.domain;

import lombok.Data;

@Data
public class ProductCreationDto {
    private String name;
    private String description;
    private String category;
    private Double price;
}
