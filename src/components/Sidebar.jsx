import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Inventory, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon><Inventory /></ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button component={Link} to="/customers">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;