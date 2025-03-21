package com.ecomerce.sportcenter.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecomerce.sportcenter.model.BrandResponse;
import com.ecomerce.sportcenter.model.ProductResponse;
import com.ecomerce.sportcenter.model.TypeResponse;
import com.ecomerce.sportcenter.service.BrandService;
import com.ecomerce.sportcenter.service.ProductService;
import com.ecomerce.sportcenter.service.TypeService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductService productService;
    private final BrandService brandService;
    private final TypeService typeService;
    
    public ProductController(ProductService productService, BrandService brandService, TypeService typeService) {
        this.productService = productService;
        this.brandService = brandService;
        this.typeService = typeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable("id") Integer productId) {
        ProductResponse productResponse = productService.getProductById(productId);
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<ProductResponse>> getProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "brandId", required = false) Integer brandId,
            @RequestParam(name = "typeId", required = false) Integer typeId,
            @RequestParam(name = "sort", defaultValue = "name") String sort,
            @RequestParam(name = "order", defaultValue = "asc") String order) {

        // Validation for page and size
        if (page < 0) throw new IllegalArgumentException("Page number cannot be negative");
        if (size < 1 || size > 100) throw new IllegalArgumentException("Page size must be between 1 and 100");

        Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

        List<String> validSortFields = List.of("name", "price", "description", "id");
        if (!validSortFields.contains(sort)) {
            sort = "name"; // Default to 'name' if invalid field is provided
        }

        Sort sorting = Sort.by(direction, sort);
        Pageable pageable = PageRequest.of(page, size, sorting);

        Page<ProductResponse> productResponses = productService.getProducts(pageable, brandId, typeId, keyword);

        return ResponseEntity.ok(productResponses);
    }

    @GetMapping("/brands")
    public ResponseEntity<List<BrandResponse>> getBrands() {
        List<BrandResponse> brandResponses = brandService.getAllBrands();
        return ResponseEntity.ok(brandResponses);
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<TypeResponse>> getTypes() {
        List<TypeResponse> typeResponses = typeService.getAllTypes();
        return ResponseEntity.ok(typeResponses);
    }
}
