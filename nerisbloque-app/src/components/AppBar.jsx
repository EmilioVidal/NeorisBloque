import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static" sx={{bgcolor:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ bgcolor: '#1976D2',textAlign:'center',padding:"10px" }} // Cambio aquí para el color de fondo
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Link to="/bienvenido" className="link">Bienvenidos</Link>
              <Link to="/creaCuenta" className="link">Crea Cuenta</Link>
              <Link to="/adminLog" className="link">Admin LoogIn</Link>
              <Link to="/game" className="link">Game</Link>
              <Link to="/score" className="link">The Score</Link>
              <Link to="/usuario" className="link">Usuario</Link>
              <Link to="/edit" className="link">Editar Perfil</Link>
              <Link to="/adminView" className="link">Admin View</Link>
              <Link to="/rewards" className="link">Rewards</Link>
              <br />
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}