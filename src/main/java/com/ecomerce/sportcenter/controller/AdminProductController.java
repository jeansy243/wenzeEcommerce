package com.ecomerce.sportcenter.controller;

import java.util.UUID;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ecomerce.sportcenter.entity.Product;
import com.ecomerce.sportcenter.entity.Brand;
import com.ecomerce.sportcenter.entity.Type;
import com.ecomerce.sportcenter.model.AdminProductResponse;
import com.ecomerce.sportcenter.model.BrandResponse;
import com.ecomerce.sportcenter.model.TypeResponse;
import com.ecomerce.sportcenter.service.AdminProductService;
import com.ecomerce.sportcenter.service.BrandService;
import com.ecomerce.sportcenter.service.TypeService;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final AdminProductService adminProductService;
    private final BrandService brandService;
    private final TypeService typeService;

    @Value("${upload.dir}")
    private String uploadDir;

    public AdminProductController(AdminProductService adminProductService, BrandService brandService, TypeService typeService) {
        this.adminProductService = adminProductService;
        this.brandService = brandService;
        this.typeService = typeService;
    }

    @PostConstruct
    public void init() {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    // Ajouter un produit
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return adminProductService.createProduct(product);
    }

    // Mettre à jour un produit
    @PutMapping("/update-product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
        try {
            Product savedProduct = adminProductService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(savedProduct);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Supprimer un produit
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        try {
            adminProductService.deleteProduct(id);
            return ResponseEntity.ok("Produit supprimé avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression");
        }
    }

    // Récupérer un produit par ID
    @GetMapping("editprod/{id}")
    public ResponseEntity<AdminProductResponse> getProductById(@PathVariable Integer id) {
        try {
            AdminProductResponse product = adminProductService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Récupérer tous les produits avec filtres
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public Page<Product> getAllProducts(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "brandId", required = false) Integer brandId,
            @RequestParam(value = "typeId", required = false) Integer typeId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Specification<Product> spec = Specification.where(null);

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and(adminProductService.searchByName(keyword));
        }
        if (brandId != null) {
            spec = spec.and(adminProductService.getByBrandId(brandId));
        }
        if (typeId != null) {
            spec = spec.and(adminProductService.getByTypeId(typeId));
        }
        if (brandId != null && typeId != null) {
            spec = spec.and(adminProductService.getByBrandAndType(brandId, typeId));
        }

        return adminProductService.getProducts(spec, page, size);
    }

    // Récupérer toutes les marques
    @GetMapping("/brands")
    public ResponseEntity<List<BrandResponse>> getBrands() {
        List<BrandResponse> brandResponses = brandService.getAllBrands();
        return ResponseEntity.ok(brandResponses);
    }

    // Récupérer tous les types
    @GetMapping("/types")
    public ResponseEntity<List<TypeResponse>> getTypes() {
        List<TypeResponse> typeResponses = typeService.getAllTypes();
        return ResponseEntity.ok(typeResponses);
    }

    // Upload d'image
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aucun fichier téléchargé");
        }

        String filename = UUID.randomUUID().toString() + "-" + StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get(uploadDir + File.separator + filename);

        try {
            Files.copy(file.getInputStream(), path);
            String imageUrl = "/images/" + filename;
            return ResponseEntity.ok("{\"imageUrl\": \"" + imageUrl + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors du téléchargement du fichier");
        }
    }

    // Créer une marque
    @PostMapping("/create/brands")
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        Brand newBrand = brandService.createBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(newBrand);
    }

    // Créer un type
    @PostMapping("/create/types")
    public ResponseEntity<Type> createType(@RequestBody Type type) {
        Type newType = typeService.createType(type);
        return ResponseEntity.status(HttpStatus.CREATED).body(newType);
    }
}
