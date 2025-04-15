package com.ecomerce.sportcenter.service;

import com.ecomerce.sportcenter.entity.Users;
import com.ecomerce.sportcenter.entity.Users.Role;  // Import the Role enum from Users
import com.ecomerce.sportcenter.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

   
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users registerUser(String username, String password, String email, Set<String> roles) {
        System.out.println("[REGISTER] Tentative d'enregistrement pour : " + username);

        if (userRepository.existsByUsername(username)) {
            System.out.println("[REGISTER] Échec - Nom d'utilisateur déjà utilisé : " + username);
            throw new IllegalArgumentException("Le nom d'utilisateur est déjà pris.");
        }

        if (userRepository.existsByEmail(email)) {
            System.out.println("[REGISTER] Échec - Email déjà utilisé : " + email);
            throw new IllegalArgumentException("L'email est déjà utilisé.");
        }

        String hashedPassword = passwordEncoder.encode(password);
        System.out.println("[REGISTER] Mot de passe hashé pour " + username + " : " + hashedPassword);

        Users user = new Users();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setEmail(email);

        Set<Role> userRoles = convertRolesToEnum(roles);
        System.out.println("[REGISTER] Rôles assignés à " + username + " : " + userRoles);

        user.setRole(userRoles);

        Users savedUser = userRepository.save(user);
        System.out.println("[REGISTER] Utilisateur enregistré avec succès : " + savedUser.getUsername());

        return savedUser;
    }

    private Set<Role> convertRolesToEnum(Set<String> roles) {
        Set<Role> userRoles = new HashSet<>();
        if (roles != null && !roles.isEmpty()) {
            for (String role : roles) {
                try {
                    Role enumRole = Role.valueOf(role.toUpperCase());
                    System.out.println("[ROLE PARSE] Role reconnu : " + enumRole);
                    userRoles.add(enumRole);
                } catch (IllegalArgumentException e) {
                    System.out.println("[ROLE PARSE] Role invalide : " + role);
                    throw new IllegalArgumentException("Role invalide : " + role);
                }
            }
        } else {
            userRoles.add(Role.USER);
            System.out.println("[ROLE PARSE] Aucun rôle fourni, rôle par défaut : USER");
        }
        return userRoles;
    }

    public boolean authenticateUser(String username, String password, Set<String> roles) {
        System.out.println("[AUTH] Tentative d'authentification pour : " + username);

        Users user = userRepository.findByUsername(username).orElse(null);

        if (user != null) {
            boolean match = passwordEncoder.matches(password, user.getPassword());
            System.out.println("[AUTH] Utilisateur trouvé. Mot de passe correct ? " + match);
            return match;
        } else {
            System.out.println("[AUTH] Utilisateur non trouvé pour le nom : " + username);
        }

        return false;
    }

    public Users loadUserByUsername(String username) {
        System.out.println("[LOAD] Chargement de l'utilisateur : " + username);
        return userRepository.findByUsername(username).orElseThrow(() -> {
            System.out.println("[LOAD] Utilisateur introuvable : " + username);
            return new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur : " + username);
        });
    }
}
