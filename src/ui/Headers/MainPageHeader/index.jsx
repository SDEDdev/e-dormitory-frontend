import React from 'react'
// Router
import { Link } from 'react-router-dom';
// MUI
import { AppBar, Box, Button, Container, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';





const drawerWidth = 240;
export default function MainPageHeader(props) {
  const { window } = props;
  const { typePage } = props || "notMain";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user") || null);


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
          <>
          {/* ----- */}
            {user.roles[0] === "user"
              &&
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to={"/order"}>Заявки</Link>
                </ListItemButton>
              </ListItem>
            }
            {/* ----- */}
            {user.roles[0] === "admin"
              &&
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to={"/dasboard/users"}>Dasboard</Link>
                </ListItemButton>
              </ListItem>
            }
            {/* ------ */}
            {user.roles[0] === "dean"
              &&
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to={"/dasboard"}>Dasboard</Link>
                </ListItemButton>
              </ListItem>
            }



            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to={"/profile"}><AccountCircleIcon /> Акаунт</Link>
              </ListItemButton>
            </ListItem>
          </>

        }

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="static" sx={{ backgroundColor: typePage === "main" ? "#fff" : "rgb(39,39,42)" }}>
        <Container>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: typePage === "main" ? "#000" : '#fff' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: "800", color: typePage === "main" ? "#000" : '#fff ' }}
            >
              <Link to={"/"}>Є-поселення</Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {!token
                &&
                <>
                  {/* ---Login---- */}
                  <Button sx={{ color: typePage === "main" ? "#fff" : '#000', backgroundColor: typePage === "main" ? "rgb(43,48,59)" : "#fff", marginRight: "15px", "&:hover": { backgroundColor: typePage === "main" ? "rgba(43,48,59,0.8)" : "#f0f0f0" } }} variant="contained">
                    <Link to={"/account/login"}>Увійти</Link>
                  </Button>
                  {/* ------- */}
                  {/* ---Register---- */}
                  <Button sx={{ color: typePage === "main" ? "#fff" : '#000', backgroundColor: typePage === "main" ? "rgb(43,48,59)" : "#fff", "&:hover": { backgroundColor: typePage === "main" ? "rgba(43,48,59,0.8)" : "#f0f0f0" } }} variant="contained">
                    <Link to={"/account/sign-up"}>Реєстрація</Link>
                  </Button>
                  {/* ------- */}
                </>
              }
              {token
                &&
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* ---Profile---- */}
                  {user.roles[0] === "user"
                    &&
                    <Button sx={{ color: typePage === "main" ? "#000" : '#fff ' }} >
                      <Link to={"/order"}>Заявки</Link>
                    </Button>}
                  {/* ------- */}
                  {/* -----AdminDasboard */}
                  {user.roles[0] === "admin"
                    &&
                    <Button sx={{ color: typePage === "main" ? "#000" : '#fff ' }} >
                      <Link to={"/dashboard/users"}>Dasboard</Link>
                    </Button>}
                  {/* ------------ */}
                  {/* -----DeanAdminDasboard */}
                  {user.roles[0] === "dean"
                    &&
                    <Button sx={{ color: typePage === "main" ? "#000" : '#fff ' }} >
                      <Link to={"/dashboard/orders"}>Dasboard</Link>
                    </Button>}
                  {/* ------------ */}
                  {/* ---Profile---- */}
                  <Button sx={{ color: typePage === "main" ? "#000" : '#fff ' }}>
                    <Link className='avatarLink' to={"/profile"}><AccountCircleIcon sx={{ fontSize: "35px", mr: "5px" }} />{user?.email}</Link>
                  </Button>
                </Box>
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
