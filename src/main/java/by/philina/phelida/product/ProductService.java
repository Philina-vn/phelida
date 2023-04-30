package by.philina.phelida.product;

import by.philina.phelida.category.Category;
import by.philina.phelida.category.CategoryService;
import by.philina.phelida.product.domain.Product;
import by.philina.phelida.product.domain.ProductCreationDto;
import by.philina.phelida.product.exception.ProductNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFound("Продукт с таким ID не найден."));
    }

    public Product create(ProductCreationDto dto) {
        Product product = new Product()
                .setName(dto.getName())
                .setDescription(dto.getDescription())
                .setPrice(dto.getPrice())
                .setCategory(categoryService.findByName(dto.getName()));
        return productRepository.save(product);
    }
}
