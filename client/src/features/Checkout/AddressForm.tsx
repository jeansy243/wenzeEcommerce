import React from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFormContext } from "react-hook-form";

const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine",
  "Arménie", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Biélorussie", "Belgique", "Belize", "Bénin",
  "Bhoutan", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada",
  "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo", "Costa Rica", "Croatie", "Cuba", "Danemark", "Djibouti", "Dominique",
  "République dominicaine", "Équateur", "Égypte", "Émirats arabes unis", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie",
  "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Allemagne", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau",
  "Guyana", "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Iran", "Irak", "Irlande", "Islande", "Israël", "Italie", "Japon", "Jordanie",
  "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", "Laos", "Lettonie", "Liban", "Lesotho", "Liberia", "Libye", "Liechtenstein",
  "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mexique",
  "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège",
  "Nouvelle-Zélande", "Oman", "Pakistan", "Palaos", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pérou", "Philippines", "Pologne", "Portugal",
  "Qatar", "Roumanie", "Russie", "Rwanda", "Arabie Saoudite", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie",
  "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Syrie", "Taïwan", "Tanzanie", "Tchad", "Thaïlande", "Timor-Leste", "Togo",
  "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
];

export default function AddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Adresse de livraison
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("firstName", { required: true })}
              label="Prénom"
              fullWidth
              variant="standard"
              autoComplete="given-name"
              error={!!errors.firstName}
              helperText={errors.firstName ? "Le prénom est requis" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastName", { required: true })}
              label="Nom"
              fullWidth
              variant="standard"
              autoComplete="family-name"
              error={!!errors.lastName}
              helperText={errors.lastName ? "Le nom est requis" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("address1", { required: true })}
              label="Adresse ligne 1"
              fullWidth
              variant="standard"
              autoComplete="given-name"
              error={!!errors.address1}
              helperText={errors.address1 ? "L'adresse ligne 1 est requise" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("address2")}
              label="Adresse ligne 2 (Optionnel)"
              fullWidth
              variant="standard"
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("city", { required: true })}
              label="Ville"
              fullWidth
              variant="standard"
              error={!!errors.city}
              helperText={errors.city ? "La ville est requise" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("state", { 
                required: true, 
                pattern: /^[A-Z]{2}$/ 
              })}
              label="État"
              fullWidth
              variant="standard"
              error={!!errors.state}
              helperText={errors.state ? "L'état doit être composé de 2 lettres majuscules" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("zip", { 
                required: true, 
                pattern: /^[0-9]+$/ 
              })}
              label="Code postal"
              fullWidth
              variant="standard"
              error={!!errors.zip}
              helperText={errors.zip ? "Le code postal doit contenir uniquement des chiffres" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Pays</InputLabel>
              <Select
                {...register("country", { required: true })}
                label="Pays"
                error={!!errors.country}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.country && (
              <Typography color="error" variant="body2">Le pays est requis</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Soumettre
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
