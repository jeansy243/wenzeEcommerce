package com.ecomerce.sportcenter.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecomerce.sportcenter.security.JwtAuthenticationEntryPoint;
import com.ecomerce.sportcenter.security.JwtAuthenticationFilter;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint entryPoint;
    private final JwtAuthenticationFilter filter;

    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;


    public SecurityConfig(JwtAuthenticationEntryPoint entryPoint, JwtAuthenticationFilter filter) {
        this.entryPoint = entryPoint;
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer:: disable)  // Disable CSRF protection
            .authorizeHttpRequests((requests)-> requests
                .requestMatchers("/products").authenticated()  // Protect /products endpoint
                .requestMatchers("/auth/login").permitAll()  // Permit /auth/login without authentication
                .anyRequest().permitAll()  // Allow all other requests
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(entryPoint)  // Handle authentication exceptions
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless session management for JWT
            )
            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter before UsernamePasswordAuthenticationFilter

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        // Configure AuthenticationManager with UserDetailsService and PasswordEncoder
       return authenticationManagerBuilder.getObject();
    }

}
