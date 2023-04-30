package by.philina.phelida.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    public void uploadImage(Long productId, MultipartFile file) throws IOException {
        Path uploadPath = Paths.get("src", "main", "resources", "images");
        String path = uploadPath + "/" + productId + ".jpg";
        Files.write(Paths.get(path), file.getBytes());
    }
}
