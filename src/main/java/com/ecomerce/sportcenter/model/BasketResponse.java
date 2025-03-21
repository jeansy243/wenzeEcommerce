package com.ecomerce.sportcenter.model;

import java.util.List;

public class BasketResponse {
	private String id;
	private List<BasketItemResponse> items;
	
	
	public BasketResponse() {
	
	}


	public BasketResponse(String id, List<BasketItemResponse> items) {
		super();
		this.id = id;
		this.items = items;
	}


	
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public List<BasketItemResponse> getItems() {
		return items;
	}


	public void setItems(List<BasketItemResponse> items) {
		this.items = items;
	}


	@Override
	public String toString() {
		return "BasketResponse [id=" + id + ", items=" + items + "]";
	}
	
	
	

}
