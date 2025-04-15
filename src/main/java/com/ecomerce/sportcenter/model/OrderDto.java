package com.ecomerce.sportcenter.model;

import java.time.LocalDateTime;

import com.ecomerce.sportcenter.entity.orders.ShippingAdress;

public class OrderDto {
	
	private String basketId;
	private ShippingAdress shippingAdress;
	private Long subTotal;
	private Long deliveryFee;
	private LocalDateTime orderDate;
	
	public OrderDto(String basketId, ShippingAdress shippingAdress, Long subTotal, Long deliveryFee,
			LocalDateTime orderDate) {
		super();
		this.basketId = basketId;
		this.shippingAdress = shippingAdress;
		this.subTotal = subTotal;
		this.deliveryFee = deliveryFee;
		this.orderDate = orderDate;
	}

	public OrderDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getBasketId() {
		return basketId;
	}

	public void setBasketId(String basketId) {
		this.basketId = basketId;
	}

	public ShippingAdress getShippingAdress() {
		return shippingAdress;
	}

	public void setShippingAdress(ShippingAdress shippingAdress) {
		this.shippingAdress = shippingAdress;
	}

	public Long getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Long subTotal) {
		this.subTotal = subTotal;
	}

	public Long getDeliveryFee() {
		return deliveryFee;
	}

	public void setDeliveryFee(Long deliveryFee) {
		this.deliveryFee = deliveryFee;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	@Override
	public String toString() {
		return "OrderDto [basketId=" + basketId + ", shippingAdress=" + shippingAdress + ", subtotal=" + subTotal
				+ ", deliveryFee=" + deliveryFee + ", orderDate=" + orderDate + "]";
	}

	
	
}
