// src/components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <ListItemText primary="Back Office" />
        </ListItem>
        <Divider />
        <List>
          {['Tableau de bord', 'Utilisateurs', 'Produits', 'Commandes', 'Paramètres', 'Déconnexion'].map((text, index) => (
            <ListItem button key={index} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </List>
    </Drawer>
  );
};

export default Sidebar;
