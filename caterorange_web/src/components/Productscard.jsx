import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const incrementQuantity = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] - 1),
    }));
  };

  const handleAddToCart = (product) => {
    // Handle adding the product to the cart with the current quantity
    console.log(`Added ${quantities[product.id]} of ${product.product_name} to the cart.`);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 , marginLeft: '20px' }}>
      {products.map(product => (
        <Card key={product.id} sx={{ width: 400 }}>
          <CardMedia
            component="img"
            height="200"
            image={`data:image/jpeg;base64,${product.images[0]}`} 
            alt={product.product_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.product_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Price : {product.price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <IconButton onClick={() => decrementQuantity(product.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {quantities[product.id]}
              </Typography>
              <IconButton onClick={() => incrementQuantity(product.id)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductCard;