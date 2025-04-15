package com.ecomerce.sportcenter.model;

import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse {
    private Set<String> role; 
	private String user;        // Utilisateur, potentiellement important pour la réponse
    private String message;
    private int statusCode;
    private String token;       // Token JWT (optionnel mais couramment utilisé)

    // Constructor with all fields
    public SuccessResponse(Set<String> role, String user, String message, int statusCode, String token) {
        this.user = user;
        this.message = message;
        this.statusCode = statusCode;
        this.token = token;
        this.role = role;
    }

    public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

	// Constructor with message, status code, and token
    public SuccessResponse(String message, int statusCode, String token) {
        this.message = message;
        this.statusCode = statusCode;
        this.token = token;
    }

    // Constructor with message and status code (no token)
    public SuccessResponse(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.token = null; // No token in this case
    }

    // Default constructor
    public SuccessResponse() {}

    // Getters and Setters
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "SuccessResponse [user=" + user + ", message=" + message + ", statusCode=" + statusCode +"role:"+role+ ", token=" + token + "]";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SuccessResponse that = (SuccessResponse) o;
        return statusCode == that.statusCode &&
                Objects.equals(user, that.user) &&
                Objects.equals(message, that.message) &&
                Objects.equals(token, that.token);
        		
    }

    @Override
    public int hashCode() {
        return Objects.hash(role,user, message, statusCode, token);
    }
}
