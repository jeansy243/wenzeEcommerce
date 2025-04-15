package com.ecomerce.sportcenter.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ecomerce.sportcenter.entity.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtException;

@Component
public class JwtHelper {

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;  // 5 heures en secondes

    // You should load this secret from a secure place, like application.properties or environment variables
    private String secret = "b94d27b9934d3e08a52e52d7da7dabf6b94d27b9934d3e08a52e52d7da7dabf6";  // 512-bit key (64 bytes)

    // Récupère le nom d'utilisateur à partir du token
    public String getUserNameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Récupère la date d'expiration du token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // Génère un token JWT à partir d'un objet Users
    public String generateToken(Users users) {
        Map<String, Object> claims = new HashMap<>();
        // Add roles or other claims if necessary
        claims.put("roles", users.getRole());
        return generateToken(claims, users.getUsername());
    }

    // Génère un token JWT en utilisant des claims personnalisés et un sujet (nom d'utilisateur)
    private String generateToken(Map<String, Object> claims, String subject) {
        // Créer une clé secrète à partir de la chaîne "secret"
        Key hmacKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setClaims(claims)  // Ajouter les claims au token
                .setSubject(subject)  // Utiliser le nom d'utilisateur comme sujet
                .setIssuedAt(new Date(System.currentTimeMillis()))  // Date de création du token
                .setExpiration(Date.from(Instant.now().plus(JWT_TOKEN_VALIDITY, ChronoUnit.SECONDS)))  // Date d'expiration
                .signWith(hmacKey, SignatureAlgorithm.HS512)  // Signature avec la clé secrète
                .compact();  // Génération du token compacté
    }

    // Valide si le token est expiré
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // Valide le token en comparant le nom d'utilisateur et en vérifiant l'expiration
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUserNameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Extraire toutes les informations des claims du token
    private Claims getAllClaimsFromToken(String token) {
        try {
            // Utilisation d'une clé pour la signature
            Key hmacKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            return Jwts.parserBuilder()
                    .setSigningKey(hmacKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException | IllegalArgumentException e) {
            // Log exception for debugging purposes
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    // Méthode générique pour obtenir un claim spécifique du token
    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
}
