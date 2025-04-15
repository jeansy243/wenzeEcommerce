package com.ecomerce.sportcenter.model;

import java.util.Set;

public class JwtResponse {
    private String username;
    private String token;
    private Set<String> role; // Ajout du champ role

    // Constructeur privé pour forcer l'utilisation du Builder Pattern
    private JwtResponse(Builder builder) {
        this.username = builder.username;
        this.token = builder.token;
        this.role = builder.role; // Initialisation du champ role
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    public Set<String> getRole() {
        return role;
    }

    // Classe Builder pour la création d'objets JwtResponse
    public static class Builder {
        private String username;
        private String token;
        private Set<String> role; // Ajout du champ role dans le Builder

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setToken(String token) {
            this.token = token;
            return this;
        }

        public Builder setRole(Set<String> role) {
            this.role = role; // Ajout de la méthode pour définir le rôle
            return this;
        }

        public JwtResponse build() {
            return new JwtResponse(this); // Création de l'objet avec le rôle
        }
    }
}
