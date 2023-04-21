import React from 'react'
// Router
import { Link } from 'react-router-dom';
// MUI
import { AppBar, Box, Button, Container, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import nookies, { parseCookies } from 'nookies'


const drawerWidth = 240;
export default function MainPageHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { token } = parseCookies()


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to={"/"}>Є-поселення</Link>
      </Typography>
      <Divider />
      <List>
        {!token
          &&
          <>
            {/* ------Login------- */}
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to={"/account/login"}>Увійти</Link>
              </ListItemButton>
            </ListItem>
            {/* ------------- */}
            {/* ------Register------- */}
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to={"/account/sign-up"}>Реєстрація</Link>
              </ListItemButton>
            </ListItem>
            {/* ------------- */}
          </>
        }
        {
          token
          &&
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={"/profile"}>Профіль</Link>
            </ListItemButton>
          </ListItem>
        }

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to={"/"}>Є-поселення</Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {!token
                &&
                <>
                  {/* ---Login---- */}
                  <Button sx={{ color: '#fff' }}>
                    <Link to={"/account/login"}>Увійти</Link>
                  </Button>
                  {/* ------- */}
                  {/* ---Register---- */}
                  <Button sx={{ color: '#fff' }}>
                    <Link to={"/account/sign-up"}>Реєстрація</Link>
                  </Button>
                  {/* ------- */}
                </>
              }
              {token
                &&
                <>
                  {/* ---Profile---- */}
                  <Button sx={{ color: '#fff' }}>
                    <Link to={"/profile"}>Профіль</Link>
                  </Button>
                  {/* ------- */}
                </>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  )
}
