package com.ecomerce.sportcenter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Restrict to your frontend origin (e.g., React app)
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowedHeaders("*") // You can specify specific headers if needed
                .allowCredentials(true); // If you need to allow cookies or credentials
    }
}
