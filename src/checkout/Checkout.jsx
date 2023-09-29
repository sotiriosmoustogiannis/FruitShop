import React from "react";
import { useEffect, useState } from 'react'
import './checkoutStyles.css'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Checkout({ setCart }) {

  const [formData, setFormData] = useState({ number: "", date: "", cvv: "", name: "" })
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt) => {
    setFormData(currData => {
      return {
        ...currData,
        [evt.target.name]: evt.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("cHECKT OUT")
    setIsSubmitted(true);
    setFormData({ number: "", date: "", cvv: "", name: "" })
    setCart([])
  }

  useEffect(() => {
    if (isSubmitted) {
      // Automatically hide the success message after 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      // Clean up the timer when the component unmounts or when isSubmitted changes
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div className="checkout">
      <h3>Checkout</h3>
      <form className="checkoutForm" onSubmit={handleSubmit}>
        <div className="checkoutInput">
          <label htmlFor="number">Card Number: </label>
          {/* make input component */}
          <input
            type="text"
            placeholder="Card Number"
            name="number"
            id="number"
            onChange={handleChange}
            value={formData.number}
          />
        </div>
        <div className="checkoutInput">
          <label htmlFor="date">Expiration Date: </label>
          <input
            type="date"
            placeholder="Expiration Date"
            name="date"
            id="date"
            onChange={handleChange}
            value={formData.date}
          />
        </div>
        <div className="checkoutInput">
          <label htmlFor="cvv">CVV: </label>
          <input
            type="text"
            placeholder="CVV"
            name="cvv"
            id="cvv"
            onChange={handleChange}
            value={formData.cvv}
          />
        </div>
        <div className="checkoutInput">
          <label htmlFor="card-name">Card Name: </label>
          <input
            type="text"
            placeholder="Card Name"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <Button type="submit" variant="primary">Checkout</Button>
      </form>
      {isSubmitted && (
        <Alert variant="success">
          Success! Your order has been submitted.
        </Alert>
      )}
    </div>
  )
}

export default Checkout