package com.ecomerce.sportcenter.service;

import java.util.List;

import com.ecomerce.sportcenter.entity.Type;
import com.ecomerce.sportcenter.model.TypeResponse;


public interface TypeService {
	List<TypeResponse> getAllTypes();

	Type createType(Type type);

}
