import ProductCard from './ProductCard';
import Voucher from './Voucher';
import VoucherPrice from './VoucherPrice';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './cartStyles.css'


// Cart component displays the shopping cart, allows voucher input, and handles navigation
function Cart({ cart, removeProduct, calculateTotalPrice, countSelectedProducts, voucherPrice, setVoucherPrice, toCatalog, toCheckout, }) {

  return (
    <div>
      <div className='cart'>
        <h3>Cart</h3>
        {/* Render the list of products in the cart */}
        {cart.length !== 0 ? cart.map((c) => (
          <ProductCard key={c.id} cart={c} removeProduct={removeProduct} />
        ))
          : <h5>Empty Cart</h5>}

        <div className='cartFooter'>

          <div className='column'>
            {/* Render the Voucher component if the cart is not empty */}
            {cart.length !== 0 ?
              <Voucher voucherPrice={voucherPrice} setVoucherPrice={setVoucherPrice} calculateTotalPrice={calculateTotalPrice} cart={cart} />
              : null}
          </div>
          <div className='column'>
            <h6>{countSelectedProducts()} products in your cart</h6>
            {/* Render VoucherPrice or display total price without voucher */}
            {voucherPrice !== null ?
              (<>
                <VoucherPrice voucherPrice={voucherPrice} setVoucherPrice={setVoucherPrice} />
              </>
              )
              : (<h5>Total Price: {calculateTotalPrice()}€</h5>)}
          </div>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className='redirect-buttons'>
        <Button onClick={toCatalog} variant='primary'>Back to Catalog</Button>
        {/* Render the Checkout button if the cart is not empty */}
        {cart.length !== 0 ? <Button onClick={toCheckout} variant="primary"> Checkout</Button> : null}
      </div>
    </div>
  )
}

export default Cart