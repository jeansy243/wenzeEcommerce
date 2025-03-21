package com.ecomerce.sportcenter.model;

public class JwtRequest {
    private String username;
    private String password;

    // Constructor with parameters
    public JwtRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Default constructor (optional)
    public JwtRequest() {
    }

    // Getter and setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Builder pattern
    public static class Builder {
        private String username;
        private String password;

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public JwtRequest build() {
            return new JwtRequest(username, password);
        }
    }
}
