import React from 'react'

// Define the DateFormInput component responsible for rendering date input fields
function DateFormInput({ name, type, placeholder, value, onChange, isValid, errorMessage, className }) {
  return (
    <>
      {/* Input field for a date component (month or year) */}
      <input className={className}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        maxLength="2"
        required
      />
    </>
  )
}

export default DateFormInput