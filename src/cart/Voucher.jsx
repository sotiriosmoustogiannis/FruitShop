import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

// Define vouchers as an object for easier lookup by voucher code
const vouchers = {
  HAPPYBIRTHDAY: { discount: 0.2, target: "total", operation: "multiply" },
  SUMMER: { discount: 2, target: "total", operation: "subtract" },
  ILIKEAPPLES: { discount: 0.6, target: "Apple", operation: "multiply" },
  ILIKEPEARS: { discount: 0.4, target: "Pear", operation: "multiply" },
  GREEN: { discount: 0.3, target: "Avocado Pear", operation: "multiply" },
};

function Voucher({ voucherPrice, setVoucherPrice, calculateTotalPrice, cart }) {
  const [formData, setFormData] = useState({ voucher: "" });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyVoucher();
    setFormData({ voucher: "" });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((currData) => ({
      ...currData,
      [name]: value,
    }));
    setError(null); // Clear any previous errors when the input changes
  };

  // Function to apply the voucher code and calculate the discounted price
  const applyVoucher = () => {
    // initialize to voucherCode the voucher code that user input
    const voucherCode = formData.voucher.toUpperCase();
    // try to find if voucher exists
    const appliedVoucher = vouchers[voucherCode];

    debugger
    // if voucher exists
    if (appliedVoucher) {
      // Calculate the total discount based on voucher type
      const totalDiscount = calculateTotalDiscount(appliedVoucher, cart);
      if (totalDiscount !== null) {
        const totalPrice = calculateTotalPrice();
        // Calculate the final discounted price
        const discountedPrice = calculateDiscountedPrice(appliedVoucher, totalPrice);
        setVoucherPrice(discountedPrice.toFixed(2)); // Set the voucher price in the state
        return;
      }
    }

    setError("Invalid voucher code");
    setVoucherPrice(null); // Clear the voucher price if invalid voucher code
  };

  // Function to calculate the total discount based on voucher type
  const calculateTotalDiscount = (voucher, cart) => {
    if (voucher.target === "total") {
      const { discount, operation } = voucher;
      const totalPrice = calculateTotalPrice();
      if (operation === "multiply") {
        return totalPrice * (1 - discount);
      } else if (operation === "subtract") {
        return totalPrice - discount;
      }
    } else {
      const { discount, operation } = voucher;
      let totalDiscount = 0;
      cart.forEach((item) => {
        const itemProduct = item.product.toLowerCase();
        const voucherProduct = voucher.target.toLowerCase();
        if (itemProduct.includes(voucherProduct) && operation === "multiply") {
          totalDiscount += item.totalPrice * discount;
        }
      });
      return totalDiscount;
    }
    return null; // Return null if voucher or operation is not valid
  };

  // Function to calculate the discounted price based on voucher type
  const calculateDiscountedPrice = (voucher, totalPrice) => {
    const { discount, operation } = voucher;
    if (operation === "multiply") {
      return totalPrice * (1 - discount);
    } else if (operation === "subtract") {
      return totalPrice - discount;
    }
    return totalPrice; // Return the original price if operation is not valid
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
        {/* Disable the Apply Voucher button if voucherPrice is truthy */}
        <Button type="submit" variant="primary" disabled={!!voucherPrice}>
          Apply Voucher
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default Voucher;
