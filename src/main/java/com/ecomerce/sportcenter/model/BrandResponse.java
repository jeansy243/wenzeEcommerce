package com.ecomerce.sportcenter.model;

public class BrandResponse {

    private Integer id;
    private String name;

    // Constructeur principal
    public BrandResponse(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    // Constructeur sans paramètres (utile pour Spring / Jackson)
    public BrandResponse() {
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    // Setters (optionnels, si vous voulez permettre la modification)
    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Méthode toString (utile pour le débogage)
    @Override
    public String toString() {
        return "BrandResponse{id=" + id + ", name='" + name + "'}";
    }
}
