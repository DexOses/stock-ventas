import { useState, useContext } from 'react';
import { 
  Button, 
  Box, 
  Modal,
  TextField,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { AppContext } from '../contexts/AppContext';

const Customers = () => {
  const { customers, addCustomer, deleteCustomer } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Teléfono', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => deleteCustomer(params.row.id)}>
            <Delete color="error" />
          </IconButton>
        </div>
      )
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    setOpenModal(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button 
          variant="contained" 
          onClick={() => setOpenModal(true)}
          sx={{ height: 56 }}
        >
          Nuevo Cliente
        </Button>
      </Box>

      <DataGrid
        rows={customers.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2
        }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Guardar Cliente
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Customers;