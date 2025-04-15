package com.ecomerce.sportcenter.repository;

import com.ecomerce.sportcenter.entity.orders.Order;
import com.ecomerce.sportcenter.entity.orders.OrderStatus;

import io.lettuce.core.dynamic.annotation.Param;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByBasketId(String basketId);
    List<Order>findByOrderStatus(OrderStatus orderStatus);
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    @Query("SELECT o FROM Order o Join o.orderItems oi WHERE oi.itemOrdered.name Like %:productName%")
    List<Order>findByProductNameInOrderItems(@Param("productName") String productName);
    @Query("SELECT o From Order o WHERE o .shippingAdress.city = :city")
    List<Order> findByShippingAddressCity(@Param("city")String city);
}
