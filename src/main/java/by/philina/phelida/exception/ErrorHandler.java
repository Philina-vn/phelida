package by.philina.phelida.exception;

import by.philina.phelida.auth.exception.UserAlreadyExistsException;
import by.philina.phelida.product.exception.ProductNotFound;
import by.philina.phelida.user.exception.UserAccountNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(ProductNotFound.class)
    public ResponseEntity<ExceptionResponse> handleProductNotFound(ProductNotFound e) {
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAccountNotFound.class)
    public ResponseEntity<ExceptionResponse> handleUserAccountNotFound(UserAccountNotFound e) {
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage()), HttpStatus.CONFLICT);
    }
}
