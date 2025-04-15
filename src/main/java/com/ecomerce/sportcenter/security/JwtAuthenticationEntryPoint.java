package com.ecomerce.sportcenter.security;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Créez un message d'erreur détaillé basé sur l'exception
        String errorMessage = authException.getMessage();
        String errorCode = "AUTH_ERROR";  // Code générique pour une erreur d'authentification

        if (authException.getCause() != null) {
            errorMessage = authException.getCause().toString() + " " + errorMessage;
        }

        // Ajouter une logique pour spécifier les erreurs selon le type de JWT
        if (authException.getCause() instanceof ExpiredJwtException) {
            errorMessage = "Le token JWT a expiré.";
            errorCode = "TOKEN_EXPIRED";
        } else if (authException.getCause() instanceof MalformedJwtException) {
            errorMessage = "Le token JWT est mal formé.";
            errorCode = "TOKEN_MALFORMED";
        }

        // Construire la réponse d'erreur
        ErrorResponse errorResponse = new ErrorResponse("Unauthorized", errorMessage, errorCode);
        objectMapper.writeValue(response.getOutputStream(), errorResponse);
    }

    private static class ErrorResponse {
        private String error;
        private String message;
        private String errorCode;
        private long timestamp;

        public ErrorResponse(String error, String message, String errorCode) {
            this.error = error;
            this.message = message;
            this.errorCode = errorCode;
            this.timestamp = System.currentTimeMillis(); // Ajout d'un timestamp
        }

        // Getters and setters
        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getErrorCode() {
            return errorCode;
        }

        public void setErrorCode(String errorCode) {
            this.errorCode = errorCode;
        }

        public long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(long timestamp) {
            this.timestamp = timestamp;
        }
    }
}
