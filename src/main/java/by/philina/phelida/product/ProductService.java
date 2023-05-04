package by.philina.phelida.product;

import by.philina.phelida.category.CategoryService;
import by.philina.phelida.material.MaterialRepository;
import by.philina.phelida.product.domain.Product;
import by.philina.phelida.product.domain.ProductCreationDto;
import by.philina.phelida.product.exception.ProductNotFound;
import by.philina.phelida.statistics.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;
    private final CategoryService categoryService;
    private final StatisticsService statisticsService;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFound("Продукт с таким ID не найден."));
    }

    public Product decrementStorageNum(Long id, Integer number) {
        Product product = findById(id);
        product.setStorageNum(product.getStorageNum() - number);
        return productRepository.save(product);
    }

    @Transactional
    public Product create(ProductCreationDto dto) {
        Product product = new Product()
                .setName(dto.getName())
                .setDescription(dto.getDescription())
                .setPrice(dto.getPrice())
                .setCategory(categoryService.findById(dto.getCategoryId()))
                .setColor(dto.getColor())
                .setStorageNum(dto.getStorageNum())
                .setOrderNum(0)
                .setMaterials(
                        dto.getMaterialIds().stream()
                                .map(id -> materialRepository.findById(id)
                                        .orElseThrow(() -> new ProductNotFound("Материал не найден.")))
                                .toList()
                );
        statisticsService.incrementProductsNum();
        return productRepository.save(product);
    }
}
