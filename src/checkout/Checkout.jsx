import React from "react";
import { useEffect, useState } from 'react'
import './checkoutStyles.css'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Checkout({ setCart, setComponent }) {

  const [formData, setFormData] = useState({ number: "", month: "", year: "", cvv: "", name: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define error states for each field
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true);
  const [isCvvValid, setIsCvvValid] = useState(true);
  const [isCardNameValid, setIsCardNameValid] = useState(true);

  const handleChange = (evt) => {
    setFormData(currData => {
      return {
        ...currData,
        [evt.target.name]: evt.target.value
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate card number
    const cardNumberRegex = /^\d+(\s\d+)*$/;
    setIsCardNumberValid(cardNumberRegex.test(formData.number));

    // Validate CVV
    const cvvRegex = /^\d{3,4}$/;
    setIsCvvValid(cvvRegex.test(formData.cvv));

    // Validate card name
    const cardNameRegex = /^[A-Za-z\s]+$/;
    setIsCardNameValid(cardNameRegex.test(formData.name));

    // Validate expiration date (month/year)
    const currentYear = new Date().getFullYear() % 100;
    const inputMonth = parseInt(formData.month, 10);
    const inputYear = parseInt(formData.year, 10);

    const isMonthValid =
      inputMonth >= 1 && inputMonth <= 12 && !isNaN(inputMonth);

    const isYearValid =
      inputYear >= currentYear && inputYear <= currentYear + 20 && !isNaN(inputYear);

    const isExpirationDateValid = isMonthValid && isYearValid;

    // Check if the expiration date is in the future
    const isFutureExpirationDate =
      isYearValid && (inputYear > currentYear || (inputYear === currentYear && inputMonth > new Date().getMonth() + 1));


    setIsExpirationDateValid(isExpirationDateValid &&
      isFutureExpirationDate)
    if (
      isCardNumberValid &&
      isCvvValid &&
      isCardNameValid &&
      isExpirationDateValid &&
      isFutureExpirationDate
    ) {
      // Form is valid, proceed with submission
      setIsSubmitted(true);
      setFormData({
        number: "",
        month: "",
        year: "",
        cvv: "",
        name: ""
      });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      // Automatically hide the success message after 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setCart([]);
        setComponent('catalog');
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
          <input
            type="text"
            placeholder="Card Number"
            name="number"
            id="number"
            onChange={handleChange}
            value={formData.number}
          />
          {/* Display error message if card number is invalid */}
          {!isCardNumberValid && (
            <p style={{ color: 'red' }}>Card number is invalid - only number and spaces</p>
          )}
        </div>
        <div className="checkoutInput">
          <label htmlFor="month">Expiration Date (mm/yy): </label>
          <div className="expiry-date">
            <input
              className="expiry-input"
              type="text"
              placeholder="MM"
              name="month"
              id="month"
              onChange={handleChange}
              value={formData.month}
              maxLength="2"
            />
            <span>/</span>
            <input
              className="expiry-input"
              type="text"
              placeholder="YY"
              name="year"
              id="year"
              onChange={handleChange}
              value={formData.year}
              maxLength="2"
            />
          </div>
          {/* Display error message if expiration date is invalid */}
          {!isExpirationDateValid && (
            <p style={{ color: 'red' }}>Expiration date is invalid - Only future date</p>
          )}
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
          {/* Display error message if CVV is invalid */}
          {!isCvvValid && (
            <p style={{ color: 'red' }}>CVV is invalid - 3 or 4 digits max</p>
          )}
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
          {/* Display error message if card name is invalid */}
          {!isCardNameValid && (
            <p style={{ color: 'red' }}>Card name is invalid - Only letters and spaces</p>
          )}
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

export default Checkout;
