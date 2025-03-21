package com.ecomerce.sportcenter.entity;

import org.springframework.data.redis.core.RedisHash;

@RedisHash("BasketItem")
public class BasketItem {
	
	
	private Integer id;
	private String name;
	private String description;
	private Long price;
	private String pictureUrl;
	private String productBrand;
	private String productType;
	private Integer quantity;
	
	
	
	
	public BasketItem() {
		
	}




	public BasketItem(Integer id, String name, String description, Long price, String pictureUrl, String productBrand,
			String productType, Integer quantity) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.pictureUrl = pictureUrl;
		this.productBrand = productBrand;
		this.productType = productType;
		this.quantity = quantity;
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




	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}




	public Long getPrice() {
		return price;
	}




	public void setPrice(Long price) {
		this.price = price;
	}




	public String getPictureUrl() {
		return pictureUrl;
	}




	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}




	public String getProductBrand() {
		return productBrand;
	}




	public void setProductBrand(String productBrand) {
		this.productBrand = productBrand;
	}




	public String getProductType() {
		return productType;
	}




	public void setProductType(String productType) {
		this.productType = productType;
	}




	public Integer getQuantity() {
		return quantity;
	}




	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}




	@Override
	public String toString() {
		return "BasketItem [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", pictureUrl=" + pictureUrl + ", productBrand=" + productBrand + ", productType=" + productType
				+ ", quantity=" + quantity + "]";
	}
	
	

}
