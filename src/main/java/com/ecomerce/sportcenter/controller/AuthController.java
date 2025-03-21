package com.ecomerce.sportcenter.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecomerce.sportcenter.model.JwtRequest;
import com.ecomerce.sportcenter.model.JwtResponse;
import com.ecomerce.sportcenter.security.JwtHelper;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper jwtHelper;

    public AuthController(UserDetailsService userDetailsService, AuthenticationManager manager, JwtHelper jwtHelper) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.jwtHelper = jwtHelper;
    }

    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        // Vérifier que les valeurs sont bien reçues
        System.out.println("Requête reçue : ");
        System.out.println("Username : " + request.getUsername());
        System.out.println("Password : " + request.getPassword());

        // Authentifier l'utilisateur
        this.authenticate(request.getUsername(), request.getPassword());

        // Charger les détails de l'utilisateur
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // Générer un token JWT
        String token = this.jwtHelper.generateToken(userDetails);

        // Créer la réponse avec le token
        JwtResponse response = new JwtResponse.Builder()
                .setUsername(userDetails.getUsername())
                .setToken(token)
                .build();

        // Retourner la réponse avec le token généré
        return new ResponseEntity<>(response, HttpStatus.OK);
    } 
    
    
    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUserDetails(@RequestHeader("Authorization") String tokenHeader) {
        String token = extractTokenFromHeader(tokenHeader);
        if (token != null) {
            String username = jwtHelper.getUserNameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private String extractTokenFromHeader(String tokenHeader) {
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            return tokenHeader.substring(7);
        }
        return null;
    }

    private void authenticate(String username, String password) {
        // Créer un token d'authentification avec les informations fournies
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        
        try {
            // Essayer d'authentifier l'utilisateur via l'AuthenticationManager
            manager.authenticate(authenticationToken);  // Ceci va lancer l'authentification réelle
        } catch (BadCredentialsException ex) {
            // Gérer l'échec d'authentification (mauvais nom d'utilisateur ou mot de passe)
            System.out.println("Erreur d'authentification : " + ex.getMessage());
            throw new BadCredentialsException("Nom d'utilisateur ou mot de passe invalide");
        } catch (Exception ex) {
            // Gérer toute autre exception
            System.out.println("Erreur générale lors de l'authentification : " + ex.getMessage());
            throw new RuntimeException("Erreur lors de l'authentification");
        }
    }
}
