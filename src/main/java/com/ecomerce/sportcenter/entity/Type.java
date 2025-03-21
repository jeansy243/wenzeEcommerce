package com.ecomerce.sportcenter.entity;

import java.util.List;

import jakarta.persistence.*;


@Entity
@Table(name="Type")
public class Type {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;
	@Column(name="Name")
	private String name;
	@OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
	private List<Product> products;
	
	
	public Type(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
		
	}

	
	
	public Type() {
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







	@Override
	public String toString() {
		return "Type [id=" + id + ", name=" + name +  "]";
	}
	
	
	

}
