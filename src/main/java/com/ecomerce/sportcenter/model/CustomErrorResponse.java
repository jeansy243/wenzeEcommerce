package com.ecomerce.sportcenter.model;

import org.springframework.http.HttpStatus;

public class CustomErrorResponse {
	private HttpStatus status;
	private String error;
	private String message;
	
	public CustomErrorResponse() {
		
	}

	public CustomErrorResponse(HttpStatus status, String error, String message) {
		super();
		this.status = status;
		this.error = error;
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "CustomErrorResponse [status=" + status + ", error=" + error + ", message=" + message + "]";
	}
	
	

		
		
		
	

}
