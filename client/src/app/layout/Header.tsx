import { ShoppingCart, AccountCircle } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography, useMediaQuery, Drawer, Divider, ListSubheader, Menu, MenuItem, Button, CircularProgress } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { useState, useEffect } from "react";
import { logOut } from "../../features/account/accountSlice"; // Import de l'action logOut
import agent from "../api/agent";

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Store', path: '/store' },
  { title: 'Contact', path: '/contact' },
];

const accountLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/registerform' },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "text.secondary",
  },
};

const activeNavStyles = {
  color: "primary.main", // Active link color
  textDecoration: "underline",
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.account);
  const basket = useAppSelector(state => state.basket);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut()); // Déconnexion de l'utilisateur
    setAnchorEl(null); // Fermer le menu
  };

  // Calcul du nombre d'articles dans le panier
  const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Box display='flex' alignItems='center'>
          <Typography variant="h6">Wenze.com</Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <List sx={{ display: 'flex' }}>
            {navLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title}
              </ListItem>
            ))}
          </List>

          <Box display="flex" alignItems="center">
            <IconButton component={NavLink} to='/basket' size="large" edge='start' color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Menu login/register seulement si l'utilisateur n'est pas connecté */}
            {!user && (
              <IconButton
                color="inherit"
                onClick={handleMenuClick}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <AccountCircle />
              </IconButton>
            )}

            {/* Menu déroulant pour login/register */}
            {!user && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {accountLinks.map(({ title, path }) => (
                  <MenuItem key={path} component={NavLink} to={path} onClick={handleMenuClose}>
                    {title}
                  </MenuItem>
                ))}
              </Menu>
            )}

            {/* Affichage du nom de l'utilisateur et bouton de déconnexion */}
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ marginRight: 2 }}>
                  hi! {JSON.parse(localStorage.getItem("user") || '{}')?.user}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <Typography>☰</Typography> {/* Icône burger */}
          </IconButton>
        </Box>

        {/* Drawer mobile */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <List
              subheader={
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>
                  Navigation
                </ListSubheader>
              }
            >
              {navLinks.map(({ title, path }) => (
                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                  {title}
                </ListItem>
              ))}
              <Divider />
              {user ? (
                <Box>
                  <ListItem button onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </ListItem>
                </Box>
              ) : (
                accountLinks.map(({ title, path }) => (
                  <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                    {title}
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
