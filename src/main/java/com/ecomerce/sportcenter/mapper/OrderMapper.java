package com.ecomerce.sportcenter.mapper;

import java.util.List;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.ecomerce.sportcenter.entity.orders.Order;  // Correct import
import com.ecomerce.sportcenter.model.OrderDto;
import com.ecomerce.sportcenter.model.OrderResponse;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    // Mapping fields between Order entity and OrderResponse DTO
    @Mapping(source = "id", target = "id")
    @Mapping(source = "basketId", target = "basketId")
    @Mapping(source = "shippingAdress", target = "shippingAdress")  // Corrected typo
    @Mapping(source = "subtotal", target = "subTotal")
    @Mapping(source = "deliveryFee", target = "deliveryFee")         // Corrected capitalization
    @Mapping(target = "total", expression = "java(order.getSubtotal() + order.getDeliveryFee())") // Calculating total
    @Mapping(target = "orderDate", expression ="java(java.time.LocalDateTime.now())")              // Map orderDate from the entity
    @Mapping(target = "orderStatus", constant = "Pending")         // Map orderStatus from the enum (if applicable)
   
    OrderResponse OrderToOrderResponse(Order order);

    // Mapping fields between OrderDto and Order entity
    @Mapping(target = "orderDate", expression = "java(orderDto.getOrderDate())")
    @Mapping(target = "orderStatus", constant = "Pending")  // Assuming 'Pending' is a constant in the enum
    Order orderResponseToOrder(OrderDto orderDto);

    // Mapping lists of orders to lists of OrderResponses
    List<OrderDto> ordersToOrderResponses(List<Order> orders);

    // Updating an existing Order entity from the OrderDto
    void updateOrderFromOrderResponse(OrderDto orderDto, @MappingTarget Order order);
    
}
