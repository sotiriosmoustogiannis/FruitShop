import './cartStyles.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const vouchers = [
  { voucher: "HAPPYBIRTHDAY", discount: 0.2, product: "total", calculation: "multiply" },
  { voucher: "SUMMER", discount: 2, product: "total", calculation: "substraction" },
  { voucher: "ILIKEAPPLES", discount: 0.6, product: "Apple", calculation: "multiply" },
  { voucher: "ILIKEPEARS", discount: 0.4, product: "pears", calculation: "multiply" },
  { voucher: "GREEN", discount: 0.3, product: ["avocados", "pears"], calculation: "multiply" },
]

function Cart({ cart, removeProduct }) {

  const [formData, setFormData] = useState({ voucher: "" })
  const [isVoucher, setIsVoucher] = useState(null);

  function calculateTotalPrice() {
    let totalPrice = 0;

    for (const item of cart) {
      totalPrice += item.totalPrice;
    }
    return totalPrice.toFixed(2);
  };

  const handleChange = (evt) => {
    setFormData((currData) => {
      return {
        ...currData,
        [evt.target.name]: evt.target.value
      }
    })
  }

  const applyVoucher = () => {
    const voucherCode = formData.voucher.toUpperCase();
    const appliedVoucher = vouchers.find(voucher => voucher.voucher === voucherCode);

    if (appliedVoucher) {
      if (appliedVoucher.product === "total") {
        if (appliedVoucher.calculation === "multiply") {
          const sum = calculateTotalPrice() * (1 - appliedVoucher.discount)
          // calculateTotalPrice() * (1 - appliedVoucher.discount);
          setIsVoucher(sum);
        } else if (appliedVoucher.calculation === "substraction") {
          const sum = (calculateTotalPrice() - appliedVoucher.discount).toFixed(2);
          setIsVoucher(sum)
        }
      } else {
        const discount = appliedVoucher.discount;
        debugger
        const updatedCart = cart.map(item => {
          if (item.product.includes(appliedVoucher.product)) {
            if (appliedVoucher.calculation === "multiply") {
              const dis = item.totalPrice * discount
              //this has problem when you add two product apples for example
              const sum = (calculateTotalPrice() - dis).toFixed(2);
              setIsVoucher(sum);
            }
          }
        });
        // Update the cart with new prices
        // You may want to set the updated cart state here
      }
    }
    else {
      setIsVoucher(null);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    applyVoucher();
    setFormData({ voucher: "" })
  }

  const removeVoucher = () => {
    setIsVoucher(null);
  }

  return (
    <div className='cart'>
      <h3>Cart</h3>
      {cart.map((c) => (
        <Card className="cartCard" key={c.id}>
          <div className="cartCard">
            {c.product} - {c.quantity} - {c.totalPrice}€
          </div>
          <Button variant="primary" onClick={() => removeProduct(c.id)}>Remove</Button>

        </Card>

      ))}
      <div className='cartFooter'>
        <div className='column'>
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
            <Button type="submit" variant="primary">Apply Voucher</Button>
          </form>
        </div>
        <div className='column'>
          {isVoucher !== null ?
            (<>
              <h6>Total Price: {isVoucher}€</h6>
              <p>Voucher has enabled</p>
              <Button onClick={removeVoucher} variant='primary'>x</Button>
            </>

            )

            : (<h6>Total Price: {calculateTotalPrice()}€</h6>)}

        </div>
      </div>
    </div>
  )
}

export default Cart