package com.ecomerce.sportcenter.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Brand")
public class Brand {
	@Id
	@GeneratedValue
	@Column(name="Id")
	private Integer id;
	@Column(name="Name")
	private String name;
	@OneToMany(mappedBy = "brand", fetch = FetchType.LAZY)
	private List<Product> products;
	
	
	
	
	
	public Brand(Integer id, String name, List<Product> products) {
		super();
		this.id = id;
		this.name = name;
		this.products = products;
	}
	
	
	
	


	public Brand() {
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
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}






	@Override
	public String toString() {
		return "Brand [id=" + id + ", name=" + name + ", products=" + products + "]";
	}
	
	
	
}
