package com.ecomerce.sportcenter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Restreindre aux origines de votre frontend
                .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH")  // Ajouter PATCH si nécessaire
                .allowedHeaders("*") // Spécifier les en-têtes nécessaires
                .allowCredentials(true); // Autoriser l'utilisation des cookies ou des informations sensibles
    }
}
