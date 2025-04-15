import React, { useState, useEffect } from 'react';
import {
  TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText,
  Grid, Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, Snackbar
} from '@mui/material';
import axios from 'axios';
import { Brand } from '../../models/brand';
import { Type } from '../../models/type';

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [pictureUrl, setPictureUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);  // État pour prévisualisation
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [newBrand, setNewBrand] = useState('');
  const [newType, setNewType] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openTypeDialog, setOpenTypeDialog] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8083/api/admin/products/brands')
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands", error));

    axios.get('http://localhost:8083/api/admin/products/types')
      .then(response => setTypes(response.data))
      .catch(error => console.error("Error fetching types", error));
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        setImageError('Veuillez télécharger un fichier image valide.');
        return;
      }
      setImageError('');
      setImage(file);
      setPictureUrl(file.name);

      // Création de l'URL de prévisualisation de l'image
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !selectedBrand || !selectedType || !image) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const uploadResponse = await axios.post('http://localhost:8083/api/admin/products/uploadImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedImageUrl = uploadResponse.data;

      const newProduct = {
        name,
        description,
        price,
        pictureUrl: uploadedImageUrl,
        brand: selectedBrand,
        type: selectedType,
      };

      const response = await axios.post('http://localhost:8083/api/admin/products', newProduct);
      console.log('Product added:', response.data);
      alert('Produit ajouté avec succès');

      // Réinitialisation des champs après soumission
      setName('');
      setDescription('');
      setPrice(0);
      setPictureUrl('');
      setSelectedBrand(null);
      setSelectedType(null);
      setImage(null);
      setPreviewUrl(null);  // Réinitialiser la prévisualisation
    } catch (error) {
      console.error('Error adding product', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const showErrorSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleAddBrand = async () => {
    if (!newBrand.trim()) {
      showErrorSnackbar("Le nom de la marque ne peut pas être vide.");
      return;
    }

    try {
      const res = await axios.post<Brand>('http://localhost:8083/api/admin/products/create/brands', { name: newBrand });
      const createdBrand = res.data;
      setBrands((prev) => [...prev, createdBrand]);
      setSelectedBrand(createdBrand);
      setNewBrand('');
      setOpenBrandDialog(false);
      showErrorSnackbar('Marque ajoutée avec succès.');
    } catch (err) {
      console.error("Erreur ajout marque", err);
      showErrorSnackbar("Erreur lors de l'ajout de la marque.");
    }
  };

  const handleAddType = async () => {
    if (!newType.trim()) {
      showErrorSnackbar("Le nom du type ne peut pas être vide.");
      return;
    }

    try {
      const res = await axios.post<Type>('http://localhost:8083/api/admin/products/create/types', { name: newType });
      const createdType = res.data;
      setTypes((prev) => [...prev, createdType]);
      setSelectedType(createdType);
      setNewType('');
      setOpenTypeDialog(false);
      showErrorSnackbar('Type ajouté avec succès.');
    } catch (err) {
      console.error("Erreur ajout type", err);
      showErrorSnackbar("Erreur lors de l'ajout du type.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Ajouter un produit</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth multiline rows={3} required
            label="Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth type="number" label="Prix (€)" required
            value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Marque</InputLabel>
            <Select
              value={selectedBrand?.id ?? ''}
              onChange={(e) =>
                setSelectedBrand(brands.find(b => b.id === e.target.value) || null)
              }
              label="Marque"
            >
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
              ))}
              <MenuItem>
                <Button fullWidth variant="outlined" color="primary" onClick={() => setOpenBrandDialog(true)}>
                  Ajouter une marque
                </Button>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              value={selectedType?.id ?? ''}
              onChange={(e) =>
                setSelectedType(types.find(t => t.id === e.target.value) || null)
              }
              label="Type"
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
              ))}
              <MenuItem>
                <Button fullWidth variant="outlined" color="primary" onClick={() => setOpenTypeDialog(true)}>
                  Ajouter un type
                </Button>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Télécharger une image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {imageError && <Typography color="error">{imageError}</Typography>}
          {image && <Typography sx={{ mt: 1 }}>Fichier sélectionné : {image.name}</Typography>}
          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <img src={previewUrl} alt="Prévisualisation" style={{ width: '100%', height: 'auto' }} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth variant="contained" color="primary"
            onClick={handleSubmit} disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Ajouter le produit'}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />

      {/* Dialog pour Marque */}
      <Dialog open={openBrandDialog} onClose={() => setOpenBrandDialog(false)}>
        <DialogTitle>Ajouter une nouvelle marque</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Nom de la marque"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBrandDialog(false)}>Annuler</Button>
          <Button onClick={handleAddBrand}>Ajouter</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour Type */}
      <Dialog open={openTypeDialog} onClose={() => setOpenTypeDialog(false)}>
        <DialogTitle>Ajouter un nouveau type</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Nom du type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTypeDialog(false)}>Annuler</Button>
          <Button onClick={handleAddType}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductForm;
