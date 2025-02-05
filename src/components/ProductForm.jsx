import { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Stack,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { AppContext } from '../contexts/AppContext';

const ProductForm = ({ initialData, onSuccess }) => {
  const { addProduct, updateProduct } = useContext(AppContext);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    code: '',
    costPrice: 0,
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <TextField
            label="Código"
            value={formData.code}
            onChange={(e) => setFormData({...formData, code: e.target.value})}
            required
          />
          <TextField
            label="Precio de costo"
            type="number"
            value={formData.costPrice}
            onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
            required
          />
          <TextField
            label="Observaciones"
            multiline
            rows={4}
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
          />
          <Button type="submit" variant="contained" fullWidth>
            {initialData ? 'Actualizar' : 'Crear'}
          </Button>
        </Stack>
      </DialogContent>
    </form>
  );
};

export default ProductForm;