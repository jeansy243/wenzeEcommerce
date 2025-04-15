package com.ecomerce.sportcenter.model;

import java.util.Set;

public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private Set<String> roles; // New field to accept roles

    // Constructor with parameters (including roles)
    public RegisterRequest(String username, String password, String email, Set<String> roles) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

    // Default constructor
    public RegisterRequest() {
        super();
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    // toString
    @Override
    public String toString() {
        return "RegisterRequest [username=" + username + ", password=" + password + ", email=" + email + ", roles=" + roles + "]";
    }
}
