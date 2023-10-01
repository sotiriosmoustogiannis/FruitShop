import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// ProductCard component displays an item in the shopping cart and allows removal
function ProductCard({ cart, removeProduct }) {
  return (
    <>
      <Card className="cartCard">
        <div className="cartCard">
          {/* Display product name, quantity, and total price */}
          {cart.product} - {cart.quantity} - {cart.totalPrice}€
        </div>
        {/* Button to remove the product from the cart */}
        <Button variant="primary" onClick={() => removeProduct(cart.id)}>Remove</Button>
      </Card>
    </>
  )
}

export default ProductCard