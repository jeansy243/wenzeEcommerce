package com.ecomerce.sportcenter.model;





public class AdminProductResponse {
	
	private Integer id;
	
	private String name;

	private String description;
	
	private Long price;
	
	private String pictureUrl;

	private String brand;

	private String type;

	
	  public AdminProductResponse(Integer id, String name, String description, Long price, String pictureUrl, String brand, String type) {
	        this.id = id;
	        this.name = name;
	        this.description = description;
	        this.price = price;
	        this.pictureUrl = pictureUrl;
	        this.brand = brand;  // Initialiser le nom de la marque
	        this.type = type;    // Initialiser le nom du type
	    }


	public AdminProductResponse() {
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


    



	public String getBrand() {
		return brand;
	}


	public void setBrand(String brand) {
		this.brand = brand;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	@Override
	public String toString() {
		return "ProductResponse [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", pictureUrl=" + pictureUrl + ", brand=" + brand + ", type=" + type + "]";
	}




	
	
	
	
	
	
}
