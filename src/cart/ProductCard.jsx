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
          <div><h6>Name: {cart.product}</h6></div>
          <div><h6>Total Quantity: {cart.quantity} </h6></div>
          <div><h6>Total Price: {cart.totalPrice}€</h6></div>
          {/* Button to remove the product from the cart */}
          <Button variant="danger" onClick={() => removeProduct(cart.id)}>Remove</Button>
        </div>

      </Card>
    </>
  )
}

export default ProductCard