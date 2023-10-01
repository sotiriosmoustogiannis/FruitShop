import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const vouchers = [
  { voucher: "HAPPYBIRTHDAY", discount: 0.2, product: "total", calculation: "multiply" },
  { voucher: "SUMMER", discount: 2, product: "total", calculation: "substraction" },
  { voucher: "ILIKEAPPLES", discount: 0.6, product: "Apple", calculation: "multiply" },
  { voucher: "ILIKEPEARS", discount: 0.4, product: "Pear", calculation: "multiply" },
  { voucher: "GREEN", discount: 0.3, product: "Avocado Pear", calculation: "multiply" },
]


function Voucher({ voucherPrice, setVoucherPrice, calculateTotalPrice, cart }) {

  const [formData, setFormData] = useState({ voucher: "" })
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault()
    applyVoucher();
    setFormData({ voucher: "" })
  }

  const handleChange = (evt) => {
    setFormData((currData) => {
      return {
        ...currData,
        [evt.target.name]: evt.target.value
      }
    })
    setError(null); // Clear any previous errors when the input changes

  }

  const applyVoucher = () => {
    const voucherCode = formData.voucher.toUpperCase();
    const appliedVoucher = vouchers.find((voucher) => voucher.voucher === voucherCode);

    if (appliedVoucher) {
      if (appliedVoucher.product === "total") {
        // Handle vouchers that apply to the total price
        if (appliedVoucher.calculation === "multiply") {
          const sum = (calculateTotalPrice() * (1 - appliedVoucher.discount)).toFixed(2);
          setVoucherPrice(sum);
        } else if (appliedVoucher.calculation === "substraction") {
          const sum = (calculateTotalPrice() - appliedVoucher.discount).toFixed(2);
          setVoucherPrice(sum);
        }
      } else {
        // Handle vouchers that apply to specific products
        const discount = appliedVoucher.discount;
        let dis = 0
        const updatedCart = cart.map((item) => {
          // Split the voucher's product name and the item's product name by spaces
          const voucherProductParts = appliedVoucher.product.toLowerCase().split(" ");
          const itemProductParts = item.product.toLowerCase().split(" ");

          // Check if any part of the voucher's product name matches any part of the item's product name
          const match = voucherProductParts.some((part) => itemProductParts.includes(part));
          debugger

          if (match) {
            if (appliedVoucher.calculation === "multiply") {
              dis += item.totalPrice * discount;

            }

          }

          return item; // Return the item unchanged if it's not affected by the voucher
        });
        const sum = (calculateTotalPrice() - dis).toFixed(2);
        setVoucherPrice(sum);
        // Update the cart with new prices
        // You may want to set the updated cart state here
      }
    } else {
      setError("Invalid voucher code");
      setVoucherPrice(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <label htmlFor="voucher">Voucher: </label>
        <input
          type="text"
          placeholder="Voucher"
          name="voucher"
          id="voucher"
          onChange={handleChange}
          value={formData.voucher}
        />
        {/* if voucher then disable the Apply Voucher button until you remove voucher */}
        {!voucherPrice ?
          <Button type="submit" variant="primary">Apply Voucher</Button> :
          <Button disabled type="submit" variant="primary">Apply Voucher</Button>}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}

export default Voucher


