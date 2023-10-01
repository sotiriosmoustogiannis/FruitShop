import React from 'react'

// VoucherPrice component displays the total price with voucher and allows voucher removal
function VoucherPrice({ voucherPrice, setVoucherPrice }) {

  // Function to remove the voucher when the button is clicked
  const removeVoucher = () => {
    setVoucherPrice(null);
  }

  return (
    <>
      {/* Display the total price with voucher*/}
      <h5>Discounted Total Price: {voucherPrice}€</h5>
      <div className='voucher-enabled'>
        {/* Display a message indicating that a voucher is enabled */}
        <p style={{ color: "green" }}>Voucher has enabled</p>
        {/* Icon button to remove the voucher */}
        <i onClick={removeVoucher} className="bi-x"></i>
      </div>
    </>
  )
}

export default VoucherPrice