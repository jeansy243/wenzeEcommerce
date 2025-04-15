package com.ecomerce.sportcenter.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecomerce.sportcenter.entity.Type; // N'oublie pas d'importer la classe Type
import com.ecomerce.sportcenter.model.TypeResponse;
import com.ecomerce.sportcenter.repository.TypeRepository;

@Service
public class TypeServiceImpl implements TypeService {

    private final TypeRepository typeRepository;

    // Constructeur pour injecter TypeRepository
    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public Type createType(Type type) {
        return typeRepository.save(type);
    }

    @Override
    public List<TypeResponse> getAllTypes() {
        List<Type> typeList = typeRepository.findAll(); // Récupération de tous les types depuis la base de données
        List<TypeResponse> typeResponses = typeList.stream()
                .map(this::convertToTypeResponse)  // Utilisation de la méthode convertToTypeResponse pour transformer chaque Type en TypeResponse
                .collect(Collectors.toList());  // Collecte les réponses dans une liste
        return typeResponses;
    }

    private TypeResponse convertToTypeResponse(Type type) {
        // Création de TypeResponse à partir de Type
        return new TypeResponse(type.getId(), type.getName()); // Assurez-vous que 'getId()' et 'getName()' existent dans Type
    }
}
