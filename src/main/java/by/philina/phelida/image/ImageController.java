package by.philina.phelida.image;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/img")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{productId}")
    public ResponseEntity<InputStreamResource> getProductImage(@PathVariable String productId) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(
                        Objects.requireNonNull(getClass().getResourceAsStream("/images/" + productId + ".jpg")))
                );
    }

    @PostMapping("/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadImage(@RequestParam MultipartFile image, @PathVariable Long productId)
            throws IOException {
        imageService.uploadImage(productId, image);
        return ResponseEntity.ok("Success");
    }
}
