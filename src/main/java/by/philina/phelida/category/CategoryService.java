package by.philina.phelida.category;

import by.philina.phelida.product.exception.ProductNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ProductNotFound("Категория не найдена."));
    }

    public List<Category> findALl() {
        return categoryRepository.findAll();
    }
}
