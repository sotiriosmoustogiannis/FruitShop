import React from "react";
import { useEffect, useState } from 'react'
import './checkoutStyles.css'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CheckoutForm from "./CheckoutForm";

function Checkout({ setCart, setComponent, totalPrice, toCart }) {

  // State to track whether the order has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use useEffect to automatically hide the success message after submission
  useEffect(() => {
    if (isSubmitted) {
      // Automatically hide the success message after 3 seconds (3000 milliseconds)
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setCart([]); //Clear the cart
        setComponent('catalog'); // Navigate back to the catalog
      }, 3000);

      // Clean up the timer when the component unmounts or when isSubmitted changes
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);


  return (
    <div className="checkout">
      <h3>Checkout</h3>
      {/* Render the CheckoutForm component */}
      <CheckoutForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} totalPrice={totalPrice} />
      {!isSubmitted && (
        // Render a button to navigate back to the cart
        <Button className="back-to-cart-button" onClick={toCart} size="lg" variant="primary">
          Back to cart
        </Button>
      )}

      {isSubmitted && (
        // Display a success message after order submission
        <Alert variant="success">
          Success! Your order has been submitted.
        </Alert>
      )}
    </div>
  )
}

export default Checkout;


