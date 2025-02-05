import { useState, useContext } from 'react';
import { 
  Button, 
  Box, 
  Modal, 
  TextField,
  IconButton 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { AppContext } from '../contexts/AppContext';
import ProductForm from '../components/ProductForm';

const Products = () => {
  const { products, deleteProduct } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { field: 'code', headerName: 'Código', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'costPrice', headerName: 'Precio', width: 120 },
    { field: 'remarks', headerName: 'Observaciones', width: 250 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => setSelectedProduct(params.row)}>
            <Edit color="primary" />
          </IconButton>
          <IconButton onClick={() => deleteProduct(params.row.id)}>
            <Delete color="error" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button 
          variant="contained" 
          onClick={() => setOpenModal(true)}
          sx={{ height: 56 }}
        >
          Nuevo Producto
        </Button>
      </Box>

      <DataGrid
        rows={products.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Modal open={openModal || Boolean(selectedProduct)} onClose={() => {
        setOpenModal(false);
        setSelectedProduct(null);
      }}>
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
          <ProductForm 
            initialData={selectedProduct}
            onSuccess={() => {
              setOpenModal(false);
              setSelectedProduct(null);
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Products;