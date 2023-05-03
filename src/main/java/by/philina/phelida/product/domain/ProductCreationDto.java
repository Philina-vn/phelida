package by.philina.phelida.product.domain;

import lombok.Data;

import java.util.List;

@Data
public class ProductCreationDto {
    private String name;
    private String description;
    private String color;
    private Long categoryId;
    private List<Long> materialIds;
    private Double price;
    private Integer storageNum;
}
