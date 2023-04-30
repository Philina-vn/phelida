package by.philina.phelida.category;

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

    public List<Category> findALl() {
        return categoryRepository.findAll();
    }
}
