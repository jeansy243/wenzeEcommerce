package com.ecomerce.sportcenter.entity.orders;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="OrderItem")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private Integer id;

    @Embedded
    private ProductItemOrdered itemOrdered;

    @Column(name="Quantity")
    private Integer quantity;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="order_id")
    private Order order;

    public OrderItem(Integer id, ProductItemOrdered itemOrdered, Integer quantity, Order order) {
        super();
        this.id = id;
        this.itemOrdered = itemOrdered;
        this.quantity = quantity;
        this.order = order;
    }

    public OrderItem() {
        super();
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ProductItemOrdered getItemOrdered() {
        return itemOrdered;
    }

    public void setItemOrdered(ProductItemOrdered itemOrdered) {
        this.itemOrdered = itemOrdered;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "OrderItem [id=" + id + ", itemOrdered=" + itemOrdered + ", quantity=" + quantity + ", order=" + order + "]";
    }
}
