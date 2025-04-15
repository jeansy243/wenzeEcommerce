package com.ecomerce.sportcenter.entity.orders;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;
	@Column(name="Basket_Id")
	private String basketId;
	@Embedded
	private ShippingAdress shippingAdress;
	@Column(name="Order_Date")
	private LocalDateTime orderDate = LocalDateTime.now();
	@OneToMany(cascade = CascadeType.ALL, mappedBy="order")
	private List<OrderItem> orderItems;
	@Column(name="Sub_Total")
	private Double subTotal;
	@Column(name="Delivery_fee")
	private Long deliveryFee;
	@Enumerated(EnumType.STRING)
	@Column(name="Order_Status")
	private OrderStatus orderStatus = OrderStatus.Pending;
	
	public Double getTotal() {
		return getSubtotal()+getDeliveryFee();
		
		
	}
	public Order(Integer id, String basketId, ShippingAdress shippingAdress, LocalDateTime orderDate,
			List<OrderItem> orderItems, Double subTotal, Long deliveryFee, OrderStatus orderStatus) {
		super();
		this.id = id;
		this.basketId = basketId;
		this.shippingAdress = shippingAdress;
		this.orderDate = orderDate;
		this.orderItems = orderItems;
		this.subTotal = subTotal;
		this.deliveryFee = deliveryFee;
		this.orderStatus = orderStatus;
	}
	public Order() {
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
	public LocalDateTime getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}
	public List<OrderItem> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	public Double getSubtotal() {
		return subTotal;
	}
	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}
	public Long getDeliveryFee() {
		return deliveryFee;
	}
	public void setDeliveryFee(Long deliveryFee) {
		this.deliveryFee = deliveryFee;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	@Override
	public String toString() {
		return "Order [id=" + id + ", basketId=" + basketId + ", shippingAdress=" + shippingAdress + ", orderDate="
				+ orderDate + ", orderItems=" + orderItems + ", subtotal=" + subTotal + ", deliveryFee=" + deliveryFee
				+ ", orderStatus=" + orderStatus + "]";
	}
	
}
