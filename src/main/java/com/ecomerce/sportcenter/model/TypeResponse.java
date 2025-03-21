package com.ecomerce.sportcenter.model;



public class TypeResponse {
	private Integer id;
	private String name;
	
	
	public TypeResponse(Integer id, String name) {
		
		this.id = id;
		this.name = name;
	}

	
	

	public TypeResponse() {
		super();
		// TODO Auto-generated constructor stub
	}






	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}
	
	
}
