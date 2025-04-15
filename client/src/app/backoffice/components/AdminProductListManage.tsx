import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importer useNavigate pour la redirection

// Définition du type pour un produit
interface Brand {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  brand: Brand;
  type: Type;
}

// Définir les types pour la réponse paginée
interface PaginatedResponse {
  content: Product[]; // Liste des produits
  totalElements: number; // Total des éléments disponibles
  totalPages: number; // Nombre de pages disponibles
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // Utiliser useNavigate pour la redirection

  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<PaginatedResponse>("/products", {
          params: {
            page: 0, // Page actuelle
            size: 10, // Nombre de produits par page
            sort: "name", // Tri des produits
            order: "asc", // Ordre croissant
          }
        });
        
        // Vérifier si la réponse contient la clé 'content' avec les produits
        if (response.data.content && Array.isArray(response.data.content)) {
          setProducts(response.data.content); // Affecter les produits
        } else {
          setError("Les données des produits ne sont pas sous forme de tableau.");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors du chargement des produits.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fonction pour supprimer un produit
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`admin/products/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
      setError("Une erreur s'est produite lors de la suppression du produit.");
    }
  };

  // Fonction pour ouvrir un formulaire de modification de produit
  const handleEdit = (id: number) => {
    navigate(`/editprod/${id}`);
    console.log("Modifier le produit avec l'ID:", id);
  };

  // Fonction pour ajouter un produit (redirige vers /addprod)
  const handleAdd = () => {
    navigate("/addprod");  // Redirige vers la page d'ajout de produit
    console.log("Ajouter un nouveau produit");
  };

  // Fonction pour extraire le nom de l'image (si nécessaire)
  const extractImageName = (product: Product): string => {
    const urlParts = product.pictureUrl.split('/');
    return urlParts[urlParts.length - 1]; // Retourne le dernier segment de l'URL qui est le nom de l'image
  };

  if (loading) {
    return <Typography variant="h6">Chargement des produits...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Ajouter un produit
        </Button>
      </Grid>
      <Grid item>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Image</TableCell>
        <TableCell>Nom</TableCell>
        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Description</TableCell>
        <TableCell>Prix</TableCell>
        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Marque</TableCell>
        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.id}</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
            {product.pictureUrl ? (
              <img
                src={`/images/products/${extractImageName(product)}`}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">Pas d'image</Typography>
            )}
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.description}</TableCell>
          <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.brand}</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.type}</TableCell>
          <TableCell>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Button fullWidth variant="contained" color="primary" onClick={() => handleEdit(product.id)}>
                  Modifier
                </Button>
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>
                  Supprimer
                </Button>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </Grid>
    </Grid>
  );
};

export default ProductList;
