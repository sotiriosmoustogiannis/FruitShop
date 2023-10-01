import { useState } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// ProductCard component displays a product and allows the user to add it to the cart
function ProductCard({ product, addToCart }) {
  const [quantityFormData, setQuantityFormData] = useState([])

  // Handle form submission when adding a product to the cart
  const handleSubmit = (event, product) => {
    event.preventDefault();

    // Check if product data exists in quantityFormData
    const productFormData = quantityFormData.find((data) => data.id === product.id);

    if (productFormData && parseFloat(productFormData.quantity) > 0) {
      // Create a new product object with quantity and price calculations
      const newProduct = {
        product: product.name,
        quantity: parseFloat(productFormData.quantity) || 0,
        price: product.price,
      };
      newProduct.totalPrice = newProduct.price * newProduct.quantity / 100;

      // Call the addToCart function with the new product data
      addToCart(newProduct);

      // Remove the product data from quantityFormData
      setQuantityFormData((currData) => {
        const updatedData = currData.filter((data) => data.id !== product.id);
        return updatedData;
      });
    }
  };

  // Handle input changes for quantity
  const handleChange = (evt, id) => {
    const { name, value } = evt.target;
    setQuantityFormData((currData) => {
      // Find the index of the item with the given id in the current quantityFormData
      const index = currData.findIndex((data) => data.id === id);

      if (index !== -1) {
        // If the item with the given id exists in quantityFormData, update it
        return currData.map((data, i) =>
          i === index ? { ...data, [name]: value } : data
        );
      } else {
        // If the item with the given id doesn't exist, add it
        return [...currData, { id, [name]: value }];
      }
    });
  };

  return (
    <>
      <Card className="productCard">
        <Card.Body>{product.name}</Card.Body>
        <form key={product.id} onSubmit={(e) => handleSubmit(e, product)}>
          <input
            type="number" id="quantity"
            placeholder="quantity (kg)"
            name="quantity"
            required
            onChange={(e) => handleChange(e, product.id)}
            value={quantityFormData.find((data) => data.id === product.id)?.quantity || "quantity"}
          />
          {parseFloat(quantityFormData.find((data) => data.id === product.id)?.quantity || "quantity") <= 0 && (
            // Display an error message if quantity is not greater than 0
            <p style={{ color: 'red' }}>Quantity must be greater than 0</p>
          )}
          <Button type="submit" variant="primary">Add to cart</Button>
        </form>
      </Card>
    </>
  )
}

export default ProductCard