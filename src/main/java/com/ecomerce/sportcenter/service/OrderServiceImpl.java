package com.ecomerce.sportcenter.service;

import org.slf4j.Logger;


import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.ecomerce.sportcenter.mapper.OrderMapper;
import com.ecomerce.sportcenter.model.BasketItemResponse;
import com.ecomerce.sportcenter.model.BasketResponse;
import com.ecomerce.sportcenter.model.OrderDto;
import com.ecomerce.sportcenter.model.OrderResponse;
import com.ecomerce.sportcenter.repository.BrandRepository;
import com.ecomerce.sportcenter.repository.OrderRepository;
import com.ecomerce.sportcenter.repository.TypeRepository;
import com.ecomerce.sportcenter.entity.orders.Order;
import com.ecomerce.sportcenter.entity.orders.OrderItem;
import com.ecomerce.sportcenter.entity.orders.ProductItemOrdered;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;
    private final BrandRepository brandRepository;
    private final TypeRepository typeRepository;
    private final BasketService basketService;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository, BrandRepository brandRepository,
                            TypeRepository typeRepository, BasketService basketService, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
        this.basketService = basketService;
        this.orderMapper = orderMapper;
    }

    @Override
    public OrderResponse getOrderById(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.map(orderMapper::OrderToOrderResponse).orElse(null);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(orderMapper::OrderToOrderResponse).collect(Collectors.toList());
    }

    @Override
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable).map(orderMapper::OrderToOrderResponse);
    }

    @Override
    public Integer createOrder(OrderDto orderDto) {
        BasketResponse basketResponse = basketService.getBasketById(orderDto.getBasketId());
        if (basketResponse == null) {
            logger.error("Basket with id {} not found", orderDto.getBasketId());  // Log the error properly
            return null;
        }

        // Calculate subTotal using BigDecimal for precise handling of prices
        BigDecimal subTotal = basketResponse.getItems().stream()
                .map(item -> new BigDecimal(item.getPrice()).multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<OrderItem> orderItems = basketResponse.getItems().stream()
                .map(this::mapBasketItemToOrderItem)
                .collect(Collectors.toList());

        // Map the OrderDto to Order entity
        Order order = orderMapper.orderResponseToOrder(orderDto);
        order.setOrderItems(orderItems);
        order.setSubTotal(subTotal.doubleValue());  // Converting BigDecimal to double if necessary

        Order savedOrder = orderRepository.save(order);

        // Delete the basket after saving the order
        basketService.deleteBasketById(orderDto.getBasketId());

        return savedOrder.getId();  // Return the saved order's ID
    }

    @Override
    public void deleteOrder(Integer orderId) {
        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
        }
    }

    private OrderItem mapBasketItemToOrderItem(BasketItemResponse basketItemResponse) {
        if (basketItemResponse == null) {
            logger.warn("Received null BasketItemResponse, skipping item mapping.");
            return null;
        }

        OrderItem orderItem = new OrderItem();
        orderItem.setItemOrdered(mapBasketItemToProduct(basketItemResponse));
        orderItem.setQuantity(basketItemResponse.getQuantity());
        return orderItem;
    }

    private ProductItemOrdered mapBasketItemToProduct(BasketItemResponse basketItemResponse) {
        ProductItemOrdered productItemOrdered = new ProductItemOrdered();
        productItemOrdered.setName(basketItemResponse.getName());
        productItemOrdered.setPictureUrl(basketItemResponse.getPictureUrl());
        productItemOrdered.setProductId(basketItemResponse.getId());
        
        return productItemOrdered;
    }
}
