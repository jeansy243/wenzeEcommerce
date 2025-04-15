package com.ecomerce.sportcenter.model;

import java.util.Set;

public class JwtRequest {
    private String username;
    private String password;
    private Set<String> role; // Ajout du champ role

    // Constructeur avec paramètres
    public JwtRequest(String username, String password, Set<String> role) {
        this.username = username;
        this.password = password;
        this.role = role; // Initialisation du champ role
    }

    // Constructeur par défaut (optionnel)
    public JwtRequest() {
    }

    // Getter et setter pour username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter et setter pour password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter et setter pour role
    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }

    // Builder pattern
    public static class Builder {
        private String username;
        private String password;
        private Set<String> role; // Ajout du champ role dans le Builder

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setRole(Set<String> role) {
            this.role = role; // Ajout de la méthode setRole
            return this;
        }

        public JwtRequest build() {
            return new JwtRequest(username, password, role); // Construction avec le rôle
        }
    }

    @Override
    public String toString() {
        return "JwtRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +  // Affichage du rôle
                '}';
    }

    // Méthode utilitaire pour créer un JwtRequest via Builder
    public static JwtRequest createRequest(String username, String password, Set<String> role) {
        return new Builder()
                .setUsername(username)
                .setPassword(password)
                .setRole(role) // Ajout du rôle dans la création
                .build();
    }
}
