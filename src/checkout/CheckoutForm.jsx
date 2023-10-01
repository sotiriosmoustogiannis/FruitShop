import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import FormInput from './FormInput';
import DateFormInput from './DateFormInput';


function CheckoutForm({ isSubmitted, setIsSubmitted, totalPrice }) {

  // Initialize state variables for form data and validation
  const [formData, setFormData] = useState({ number: '', month: '', year: '', cvv: '', name: '' });

  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true);
  const [isCvvValid, setIsCvvValid] = useState(true);
  const [isCardNameValid, setIsCardNameValid] = useState(true);

  // Handle form input changes
  const handleChange = (evt) => {
    setFormData((currData) => ({
      ...currData,
      [evt.target.name]: evt.target.value,
    }));
  };

  // Function to validate the form input fields with regex
  const validateForm = () => {
    const cardNumberRegex = /^\d+(\s\d+)*$/;
    const cvvRegex = /^\d{3,4}$/;
    const cardNameRegex = /^[A-Za-z\s]+$/;

    const isCardNumberValid = cardNumberRegex.test(formData.number);
    const currentYear = new Date().getFullYear() % 100;
    const inputMonth = parseInt(formData.month, 10);
    const inputYear = parseInt(formData.year, 10);
    const isMonthValid =
      inputMonth >= 1 && inputMonth <= 12 && !isNaN(inputMonth);
    const isYearValid =
      inputYear >= currentYear && inputYear <= currentYear + 20 && !isNaN(inputYear);
    const isExpirationDateValid =
      isMonthValid &&
      isYearValid &&
      ((inputYear === currentYear &&
        inputMonth >= new Date().getMonth() + 1) ||
        inputYear > currentYear);
    const isCvvValid = cvvRegex.test(formData.cvv);
    const isCardNameValid = cardNameRegex.test(formData.name);

    // Update the state variables
    setIsCardNumberValid(isCardNumberValid);
    setIsExpirationDateValid(isExpirationDateValid);
    setIsCvvValid(isCvvValid);
    setIsCardNameValid(isCardNameValid);

    return {
      isCardNumberValid,
      isExpirationDateValid,
      isCvvValid,
      isCardNameValid,
    };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form input fields
    const {
      isCardNumberValid,
      isExpirationDateValid,
      isCvvValid,
      isCardNameValid,
    } = validateForm();

    // If all input fields are valid, set the form as submitted and reset the form data
    if (
      isCardNumberValid &&
      isExpirationDateValid &&
      isCvvValid &&
      isCardNameValid
    ) {
      setIsSubmitted(true);
      setFormData({
        number: '',
        month: '',
        year: '',
        cvv: '',
        name: '',
      });
    }
  };



  return (
    <form className="checkoutForm" onSubmit={handleSubmit}>
      {/* Form input for Card Number */}
      <FormInput
        label="Card Number"
        name="number"
        type="text"
        placeholder="Card Number"
        value={formData.number}
        onChange={handleChange}
        isValid={isCardNumberValid}
        errorMessage="Card number is invalid - only number and spaces"
      />
      <div className="checkoutInput">
        {/* Form inputs for Expiration Date */}
        <label htmlFor="month">Expiration Date (mm/yy): </label>
        <div className="expiry-date">
          {/* Form input for Month */}
          <DateFormInput
            className="expiry-input"
            name="month"
            type="text"
            placeholder="MM"
            value={formData.month}
            onChange={handleChange}
            isValid={isExpirationDateValid}
            errorMessage="Expiration date is invalid - Only future date"
          />
          <span>/</span>
          {/* Form input for Year */}
          <DateFormInput
            className="expiry-input"
            name="year"
            type="text"
            placeholder="YY"
            value={formData.year}
            onChange={handleChange}
            isValid={isExpirationDateValid}
            errorMessage="Expiration date is invalid - Only future date"
          />
        </div>
        {/* Display error message if expiration date is invalid */}
        {!isExpirationDateValid && (
          <p style={{ color: 'red' }}>Expiration date is invalid - Only future date</p>
        )}
      </div>
      {/* Form input for CVV */}
      <FormInput
        label="CVV"
        name="cvv"
        type="text"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleChange}
        isValid={isCvvValid}
        errorMessage="CVV is invalid - 3 or 4 digits max"
      />
      {/* Form input for Card Name */}
      <FormInput
        label="Card Name"
        name="name"
        type="text"
        placeholder="Card Name"
        value={formData.name}
        onChange={handleChange}
        isValid={isCardNameValid}
        errorMessage="Card name is invalid - Only letters and spaces"
      />
      {/* Checkout button */}
      {!isSubmitted && (
        <Button type="submit" variant="primary">Checkout {totalPrice}€</Button>
      )}

    </form>
  )
}

export default CheckoutForm