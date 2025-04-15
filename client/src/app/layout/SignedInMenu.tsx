import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Button, Menu, MenuItem } from '@mui/material';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to open the menu
  const handleMenuClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle item clicks
  const createHandleMenuClick = (item:any) => () => {
    if (item === "Log out") {
      // Handle logout logic here, e.g., dispatching a logout action
      dispatch({ type: 'LOGOUT' });
    } else {
      // Handle other actions
      console.log(`${item} clicked`);
    }
    handleMenuClose();
  };

  return (
    <>
      <Button onClick={handleMenuClick}
      color='inherit'
      sx={{typography:'h6'}}
      >Hi! {user?.username}</Button>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Language settings')}>Language settings</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
      </Menu>
    </>
  );
}
