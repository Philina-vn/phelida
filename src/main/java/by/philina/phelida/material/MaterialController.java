package by.philina.phelida.material;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/materials")
public class MaterialController {

    private final MaterialRepository materialRepository;

    @GetMapping
    public ResponseEntity<List<Material>> findAll() {
        return ResponseEntity.ok(materialRepository.findAll());
    }
}
