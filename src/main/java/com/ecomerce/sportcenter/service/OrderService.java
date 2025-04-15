package com.ecomerce.sportcenter.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecomerce.sportcenter.model.OrderDto;
import com.ecomerce.sportcenter.model.OrderResponse;

public interface OrderService {
	
	OrderResponse getOrderById(Integer orderId);
	List<OrderResponse> getAllOrders();
	Page<OrderResponse> getAllOrders(Pageable pageable);
	Integer createOrder(OrderDto order);
	void deleteOrder(Integer orderId);
	


}
