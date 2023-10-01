import React from "react";

// Define the FormInput component responsible for rendering form input fields
function FormInput({ label, name, type, placeholder, value, onChange, isValid, errorMessage }) {
  return (
    <div className="checkoutInput">
      {/* Label for the input field */}
      <label htmlFor={name}>{label}: </label>
      {/* Input field */}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        required
      />
      {/* Display an error message if the input is invalid */}
      {!isValid && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default FormInput;
