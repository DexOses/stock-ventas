import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Home from './views/Home';
import Products from './views/Products';
import Customers from './views/Customers';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </Box>
        </Box>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;