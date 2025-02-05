import { useState, useContext } from 'react';
import { TextField, Button, Modal, Box, Typography, Grid } from '@mui/material';
import { AppContext } from '../contexts/AppContext';

const Home = () => {
  const { products } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar producto..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box 
              sx={{ 
                p: 2, 
                border: '1px solid #ddd', 
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
              onClick={() => setSelectedProduct(product)}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Código: {product.code}</Typography>
              <Typography>Precio: ${product.costPrice}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h5" gutterBottom>{selectedProduct?.name}</Typography>
          <Typography>Código: {selectedProduct?.code}</Typography>
          <Typography>Precio: ${selectedProduct?.costPrice}</Typography>
          <TextField
            fullWidth
            label="Descuento (%)"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            sx={{ my: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setSelectedProduct(null)}>
              Seguir comprando
            </Button>
            <Button variant="contained" color="success">
              Finalizar compra
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;