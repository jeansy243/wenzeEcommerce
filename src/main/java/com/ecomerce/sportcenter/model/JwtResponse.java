package com.ecomerce.sportcenter.model;
public class JwtResponse {
    private String username;
    private String token;

    // Private constructor to enforce the builder pattern
    private JwtResponse(Builder builder) {
        this.username = builder.username;
        this.token = builder.token;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    // Builder class for constructing JwtResponse objects
    public static class Builder {
        private String username;
        private String token;

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setToken(String token) {
            this.token = token;
            return this;
        }

        public JwtResponse build() {
            return new JwtResponse(this);
        }
    }
}
