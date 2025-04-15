package com.ecomerce.sportcenter.entity.orders;


public class ShippingAdress {

	private String name ;
	private String adress1;
	private String adress2;
	private String city;
	private String state;
	private String zipcode;
	private String country;
	
	
	public ShippingAdress() {
		
	}


	public ShippingAdress(String name, String adress1, String adress2, String city, String state, String zipcode,
			String country) {
		super();
		this.name = name;
		this.adress1 = adress1;
		this.adress2 = adress2;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.country = country;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAdress1() {
		return adress1;
	}


	public void setAdress1(String adress1) {
		this.adress1 = adress1;
	}


	public String getAdress2() {
		return adress2;
	}


	public void setAdress2(String adress2) {
		this.adress2 = adress2;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getZipcode() {
		return zipcode;
	}


	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	@Override
	public String toString() {
		return "ShippingAdress [name=" + name + ", adress1=" + adress1 + ", adress2=" + adress2 + ", city=" + city
				+ ", state=" + state + ", zipcode=" + zipcode + ", country=" + country + "]";
	}
	
	
}
