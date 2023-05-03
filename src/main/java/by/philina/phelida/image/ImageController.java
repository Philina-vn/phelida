package by.philina.phelida.image;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/img")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @SneakyThrows
    @GetMapping("/{productId}")
    public ResponseEntity<InputStreamResource> getProductImage(@PathVariable String productId) {
        String path = System.getProperty("user.dir") + "/src/main/images/" + productId + ".jpg";
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(
                                new FileInputStream(path)
                        )
                );
    }

    @PostMapping("/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image, @PathVariable Long productId)
            throws IOException {
        imageService.uploadImage(productId, image);
        return ResponseEntity.ok("Success");
    }
}
