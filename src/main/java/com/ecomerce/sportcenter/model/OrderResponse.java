package com.ecomerce.sportcenter.model;

import java.time.LocalDateTime;

import com.ecomerce.sportcenter.entity.orders.OrderStatus;
import com.ecomerce.sportcenter.entity.orders.ShippingAdress;

public class OrderResponse {
	
	private Integer id;
	private String basketId;
	private ShippingAdress shippingAdress;
	private Long subTotal;
	private Long deliveryFee;
	private Double total;
	private LocalDateTime orderDate;
	private OrderStatus orderStatus;
	
	public OrderResponse(Integer id, String basketId, ShippingAdress shippingAdress, Long subTotal, Long deliveryFee,
			Double total, LocalDateTime orderDate, OrderStatus orderStatus) {
		super();
		this.id = id;
		this.basketId = basketId;
		this.shippingAdress = shippingAdress;
		this.subTotal = subTotal;
		this.deliveryFee = deliveryFee;
		this.total = total;
		this.orderDate = orderDate;
		this.orderStatus = orderStatus;
	}

	public OrderResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "OrderResponse [id=" + id + ", basketId=" + basketId + ", shippingAdress=" + shippingAdress
				+ ", subTotal=" + subTotal + ", deliveryFee=" + deliveryFee + ", total=" + total + ", orderDate="
				+ orderDate + ", orderStatus=" + orderStatus + "]";
	}
	
	
	

}
