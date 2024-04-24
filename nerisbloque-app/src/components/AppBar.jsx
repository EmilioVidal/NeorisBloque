import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NeorisPP from '../img/NEORIS logo light.png'
import ProfileAvatar from "./ProfileAvatar"
import { Link } from 'react-router-dom';

const pages = ['Juego', 'Recompensas'];
const settings = ['Perfil', 'Editar Perfil'];

function ResponsiveAppBar({ profileImageUrl }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const goToPorf = (settings) => {
        if (settings == "Perfil"){
            window.location.href = "/usuario";
        }
        else if(settings == "Editar Perfil"){
            window.location.href = "/edit"
        }
    }

    const mainP = () =>
    { 
        window.location.href = "/game"
    }
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            
            <img src={NeorisPP} alt="Neoris logo" style={{ width: "200px", marginRight: "auto", cursor: "pointer" }} onClick={() => mainP()} />
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', marginRight:"50px", textAlign:"center" }}>
                <Link to={"/upload"} style={{fontSize:"20px"}}>Mandar Avances</Link>
            </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div style={{ width:"50px", height:"auto"}}>
                    <ProfileAvatar imageUrl={profileImageUrl} />
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => goToPorf(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar; 