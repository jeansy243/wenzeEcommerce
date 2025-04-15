package com.ecomerce.sportcenter.entity.orders;

public class ProductItemOrdered {
	
	private Integer productId;
	private String name;
	private String pictureUrl;
	
	
	public ProductItemOrdered(Integer productId, String name, String pictureUrl) {
		super();
		this.productId = productId;
		this.name = name;
		this.pictureUrl = pictureUrl;
	}


	public ProductItemOrdered() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Integer getProductId() {
		return productId;
	}


	public void setProductId(Integer productId) {
		this.productId = productId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getPictureUrl() {
		return pictureUrl;
	}


	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}


	@Override
	public String toString() {
		return "ProductItemOrdered [productId=" + productId + ", name=" + name + ", pictureUrl=" + pictureUrl + "]";
	}
	
	
	
}
