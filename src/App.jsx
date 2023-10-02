import { useEffect, useState } from 'react'
import Catalog from './catalog/Catalog.jsx'
import Cart from './cart/Cart.jsx'
import Checkout from './checkout/Checkout.jsx'
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

// Define the URL to fetch product data
const productUrl = 'https://demo0336234.mockable.io/products'

function App() {

  //Simple Routing Handler - component state keeps the current displayed component

  const [component, setComponent] = useState(["catalog"])

  // Function to navigate to the Catalog component
  const toCatalog = () => {
    setComponent("catalog")
    setVoucherPrice(null)
  }

  // Function to navigate to the Cart component
  const toCart = () => {
    setComponent("cart")
  }

  // Function to navigate to the Checkout component
  const toCheckout = () => {
    setComponent("checkout")
  }

  useEffect(() => {
    // Component effect for navigation
  }, [component])

  //------------------PRODUCT CATALOG STATE-----------------------------
  const [products, setProducts] = useState([])

  // Function to fetch product data from the specified URL
  const fetchProducts = () => {
    fetch(productUrl)
      .then(response => {
        return response.clone().json()
      })
      .then(data => {
        console.log(data)
        setProducts(data.products)
      })
  }

  useEffect(() => {
    // Fetch products and set the default component to catalog
    fetchProducts()
    setComponent("catalog")
  }, [])

  //-----------------------CART STATE-----------------------------------
  const [cart, setCart] = useState([])

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((currCart) => {
      return [...currCart, { ...product, id: uuid() }];
    });
  };

  // Function to remove a product from the cart based on its ID
  const removeProduct = (id) => {
    setCart((prevCart) => {
      return prevCart.filter((cart) => cart.id !== id)
    })
    setVoucherPrice(null)
  }

  // Function to calculate the total price of items in the cart without voucher
  function calculateTotalPrice() {
    let totalPrice = 0;

    for (const product of cart) {
      totalPrice += product.totalPrice;
    }
    return totalPrice.toFixed(2); // Format the total price with 2 decimal places
  };

  // Function to calculate the total price of items in the cart without voucher
  function countSelectedProducts() {
    let counter = 0;

    for (const product of cart) {
      counter += product.quantity;
    }
    return counter; // Format the total price with 2 decimal places
  };

  // State to store the total price after the existance of a valid voucher
  const [voucherPrice, setVoucherPrice] = useState(null);


  return (
    <>
      <h1>Fruit Shop</h1>
      {products && component === "catalog" && <>
        {/* Render the Catalog component with product data and navigation functions */}
        <Catalog
          products={products}
          addToCart={addToCart}
          countSelectedProducts={countSelectedProducts}
          calculateTotalPrice={calculateTotalPrice}
          toCart={toCart} />
      </>}
      {component === "cart" && <>
        {/* Render the Cart component with cart data and navigation functions */}
        <Cart
          cart={cart}
          removeProduct={removeProduct}
          calculateTotalPrice={calculateTotalPrice}
          countSelectedProducts={countSelectedProducts}
          voucherPrice={voucherPrice}
          setVoucherPrice={setVoucherPrice}
          toCatalog={toCatalog}
          toCheckout={toCheckout} />
      </>}
      {cart.length !== 0 && component === "checkout" && <>
        {/* Render the Checkout component with cart data and navigation functions */}
        {voucherPrice !== null ?
          /* Render the Checkout component dependng the existance of a voucher code or not */
          <Checkout setCart={setCart} setComponent={setComponent} toCart={toCart} totalPrice={voucherPrice} /> :
          <Checkout setCart={setCart} setComponent={setComponent} toCart={toCart} totalPrice={calculateTotalPrice()} />
        }

      </>}
    </>
  )
}

export default App
