# couche 1 : build avec Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .

COPY src ./src
COPY .git /app/.git


# Compiler le projet (le .jar sera généré dans target/) skip des tests car on est en production
RUN mvn clean package -DskipTests

# couche 2 : image légère à base d'alpine (plus léger que ubuntu) pour l'exécution
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copier le jar depuis l'image de build qui va se créér toujours dans ce dossier 
COPY --from=builder /app/target/*.jar app.jar

# Exposer le port de ton application 
EXPOSE 8083

# Lancer l'application avec la ligne 
ENTRYPOINT ["java", "-jar", "app.jar"]



