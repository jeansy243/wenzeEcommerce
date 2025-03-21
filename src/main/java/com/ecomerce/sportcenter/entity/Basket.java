package com.ecomerce.sportcenter.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.RedisHash;

import jakarta.persistence.Id;

@RedisHash("Basket")
public class Basket {
	@Id
	private String id;
	private List<BasketItem> items  =new ArrayList<>();
	
	public Basket() {
		
	}

	public Basket(String id) {
		
		this.id = id;
	}

	public Basket(String id, List<BasketItem> items) {
		
		this.id = id;
		this.items = items;
	}

	
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<BasketItem> getItems() {
		return items;
	}

	public void setItems(List<BasketItem> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "Basket [id=" + id + ", items=" + items + "]";
	}
	
	
	

}
