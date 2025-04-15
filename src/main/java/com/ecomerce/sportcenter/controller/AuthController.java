package com.ecomerce.sportcenter.controller;

import com.ecomerce.sportcenter.entity.Users;
import com.ecomerce.sportcenter.entity.Users.Role;
import com.ecomerce.sportcenter.model.ErrorResponse;
import com.ecomerce.sportcenter.model.LoginRequest;
import com.ecomerce.sportcenter.model.RegisterRequest;
import com.ecomerce.sportcenter.model.SuccessResponse;
import com.ecomerce.sportcenter.security.JwtHelper;
import com.ecomerce.sportcenter.service.TokenBlacklistService;
import com.ecomerce.sportcenter.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserServiceImpl userServiceImpl;
    private final TokenBlacklistService tokenBlacklistService;
    private final JwtHelper jwtHelper;  // Inject JwtHelper
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    public AuthController(UserServiceImpl userServiceImpl, TokenBlacklistService tokenBlacklistService, JwtHelper jwtHelper) {
        this.userServiceImpl = userServiceImpl;
        this.tokenBlacklistService = tokenBlacklistService;
        this.jwtHelper = jwtHelper;
    }

    // Inscription de l'utilisateur
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (!isValidPassword(registerRequest.getPassword())) {
                ErrorResponse errorResponse = new ErrorResponse("Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.", HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            if (!isValidEmail(registerRequest.getEmail())) {
                ErrorResponse errorResponse = new ErrorResponse("L'email n'est pas valide.", HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            Set<String> roles = registerRequest.getRoles() != null ? registerRequest.getRoles() : Set.of("USER");

            for (String role : roles) {
                if (!isValidRole(role)) {
                    ErrorResponse errorResponse = new ErrorResponse("Role invalide : " + role, HttpStatus.BAD_REQUEST.value());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
                }
            }

            Users newUser = userServiceImpl.registerUser(
                    registerRequest.getUsername(),
                    registerRequest.getPassword(),
                    registerRequest.getEmail(),
                    roles
            );

            SuccessResponse successResponse = new SuccessResponse("Utilisateur enregistré avec succès.", HttpStatus.CREATED.value());
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);

        } catch (IllegalArgumentException e) {
            logger.severe("Registration failed: " + e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // Validation du mot de passe
    private boolean isValidPassword(String password) {
        String passwordPattern = "^(?=.*[0-9])(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$";
        return password.matches(passwordPattern);
    }

    // Validation de l'email
    private boolean isValidEmail(String email) {
        String emailPattern = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailPattern);
    }

    // Validation des rôles
    private boolean isValidRole(String role) {
        try {
            Role.valueOf(role.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    
    
    

    // Connexion de l'utilisateur
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean authenticated = userServiceImpl.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword(), loginRequest.getRole());
        if (authenticated) {
            // Génération du token JWT
            String token = jwtHelper.generateToken(userServiceImpl.loadUserByUsername(loginRequest.getUsername()));
            String user = loginRequest.getUsername();
            Set<String> role = loginRequest.getRole();
            // Réponse de succès avec le token
            SuccessResponse successResponse = new SuccessResponse( role ,user,"Connexion réussie.", HttpStatus.OK.value(), token);
            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        } else {
            // Réponse en cas d'échec
            ErrorResponse errorResponse = new ErrorResponse("Nom d'utilisateur ou mot de passe incorrect.", HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    // Déconnexion de l'utilisateur
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token); // Ajouter le token à la blacklist
            return ResponseEntity.ok("Déconnecté avec succès");
        }
        return ResponseEntity.badRequest().body("Token manquant ou invalide");
    }
}
