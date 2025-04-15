import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  // API de Lorem Picsum pour récupérer des images aléatoires
  const picsumAPI = "https://picsum.photos/800/600?random"; // URL pour récupérer des images aléatoires

  // Fonction pour récupérer des images
  const fetchImages = async () => {
    // Création de 6 images aléatoires (3 pour albums, 3 pour artistes)
    const albumImages = [];
    const artistImages = [];
    
    for (let i = 0; i < 3; i++) {
      const albumImage = `${picsumAPI}&random=${Math.random()}`;
      albumImages.push({ id: i, imageUrl: albumImage });
    }

    for (let i = 0; i < 3; i++) {
      const artistImage = `${picsumAPI}&random=${Math.random()}`;
      artistImages.push({ id: i, imageUrl: artistImage });
    }

    setAlbums(albumImages);
    setArtists(artistImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section - Image d'accueil */}
      <Box
        sx={{
          backgroundImage: `url(${albums[0]?.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ textShadow: 2 }}>
          Bienvenue sur MusicZone
        </Typography>
        <Typography variant="h5" sx={{ textShadow: 2 }}>
          Découvrez vos artistes préférés et explorez des playlists
        </Typography>
      </Box>

      {/* Albums Section */}
      <Box sx={{ padding: '50px 20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Nos Albums
        </Typography>
        <Typography variant="body1" paragraph>
          Découvrez une sélection de nos albums les plus populaires.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {albums.map((album) => (
            <Grid item xs={12} sm={4} key={album.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={album.imageUrl}
                  alt={`Album ${album.id + 1}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Album {album.id + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Un voyage sonore captivant à travers divers genres.
                  </Typography>
                  <Button variant="outlined" component={Link} to={`/album/${album.id + 1}`}>
                    Écouter
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Artistes Section */}
      <Box sx={{ padding: '50px 20px', backgroundColor: '#f4f4f4', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Nos Artistes
        </Typography>
        <Typography variant="body1" paragraph>
          Explorez les profils de vos artistes préférés.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {artists.map((artist) => (
            <Grid item xs={12} sm={4} key={artist.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={artist.imageUrl}
                  alt={`Artiste ${artist.id + 1}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Artiste {artist.id + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Un artiste qui fait sensation avec des rythmes envoûtants.
                  </Typography>
                  <Button variant="outlined" component={Link} to={`/artist/${artist.id + 1}`}>
                    Voir Profil
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box sx={{ padding: '50px 20px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Rejoignez-nous et commencez à écouter de la musique maintenant !
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/signup">
          S'inscrire
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; 2025 MusicZone | <a href="/privacy" style={{ color: 'white' }}>Politique de confidentialité</a> | <a href="/terms" style={{ color: 'white' }}>Conditions d'utilisation</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
