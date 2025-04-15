package com.ecomerce.sportcenter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecomerce.sportcenter.entity.Users;
import com.ecomerce.sportcenter.repository.UserRepository;

@Configuration
public class MyConfig {

    private final UserRepository userRepository;

    public MyConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Configure a custom UserDetailsService to load user details from the database.
     * @return a UserDetailsService instance
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // Fetch user from the database by username
            Users user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Convert roles from the Enum Set to a String array for Spring Security
            String[] roles = user.getRole().stream()
                    .map(Enum::name)  // Convert Enum values to their string names
                    .toArray(String[]::new);

            // Create and return a UserDetails object (Spring Security User)
            return User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword()) // Password is already hashed
                    .roles(roles) // Set the roles from the user's record
                    .build();
        };
    }

    /**
     * PasswordEncoder bean to handle password encryption.
     * @return a BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Return the BCryptPasswordEncoder instance
        return new BCryptPasswordEncoder();
    }
}
