import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  // Récupérer les produits depuis l'API avec pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Début du chargement des produits

      try {
        const response = await axios.get<PaginatedResponse>("http://localhost:8083/api/admin/products", {
          params: {
            page: page, // Page actuelle
            size: 10,   // Nombre de produits par page
            sort: "name",
            order: "asc",
          }
        });

        if (response.data.content && Array.isArray(response.data.content)) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Les données des produits ne sont pas sous forme de tableau.");
        }
      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors du chargement des produits.");
      }

      setLoading(false); // Fin du chargement des produits
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Fonction pour extraire le nom de l'image
  const extractImageName = (product: Product): string => {
    const urlParts = product.pictureUrl.split('/');
    return urlParts[urlParts.length - 1]; // Retourne le dernier segment de l'URL qui est le nom de l'image
  };

  // Fonction pour ajouter un produit (redirige vers /addprod)
  const handleAdd = () => {
    navigate("/addprod");
  };

  // Fonction pour modifier un produit (redirige vers /editprod/{id})
  const handleEdit = (id: number) => {
    navigate(`/editprod/${id}`);
  };

  // Fonction pour supprimer un produit
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8083/api/admin/products/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
      setError("Une erreur s'est produite lors de la suppression du produit.");
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Ajouter un produit
        </Button>
      </Grid>
      <Grid item>
        {loading ? (
          <Typography variant="h6">Chargement des produits...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <>
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
                            src={`http://localhost:8083/images/products/${extractImageName(product)}`}
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
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.brand.name}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.type.name}</TableCell>
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
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                >
                  Précédent
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages - 1}
                >
                  Suivant
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductList;
