package com.ecomerce.sportcenter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Product", schema = "sports-center") 
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;
	@Column(name="Name")
	private String name;
	@Column(name="Description")
	private String description;
	@Column(name="Price")
	private Long price;
	@Column(name="PictureUrl")
	private String pictureUrl;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="ProductBrandId", referencedColumnName = "Id")
	private Brand brand;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="ProductTypeId", referencedColumnName = "Id")
	private Type type;
	
	
	public Product(Integer id, String name, String description, Long price, String pictureUrl, Brand brand, Type type) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.pictureUrl = pictureUrl;
		this.brand = brand;
		this.type = type;
	}


	public Product() {
		
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


	public Brand getBrand() {
		return brand;
	}


	public void setBrand(Brand brand) {
		this.brand = brand;
	}


	public Type getType() {
		return type;
	}


	public void setType(Type type) {
		this.type = type;
	}


	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", pictureUrl=" + pictureUrl + ", brand=" + brand + ", type=" + type + "]";
	}
	
	
	
	
}
