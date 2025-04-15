package com.ecomerce.sportcenter.config;

import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ecomerce.sportcenter.mapper.OrderMapper;

@Configuration
public class MapperConfig {

	@Bean
	public OrderMapper orderMapper() {
		return Mappers.getMapper(OrderMapper.class);
	}
}
