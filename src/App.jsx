import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Catalog from './catalog/Catalog.jsx'
import Cart from './cart/Cart.jsx'
import Checkout from './checkout/Checkout.jsx'
import { v4 as uuid } from 'uuid';


const productUrl = 'https://demo0336234.mockable.io/products'


function App() {

  //------------------PRODUCT CATALOG STATE-----------------------------
  const [products, setProducts] = useState([])

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
    fetchProducts()
  }, [])



  //-----------------------CART STATE-----------------------------------
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((currCart) => {
      return [...currCart, { ...product, id: uuid() }];
    });
  };

  const removeProduct = (id) => {
    setCart((prevCart) => {
      return prevCart.filter((cart) => cart.id !== id)
    })
  }


  return (
    <>
      <h1>Welcome to Fruit Shop</h1>
      {products && <>
        <Catalog products={products} addToCart={addToCart} />
      </>}
      {cart.length !== 0 && <>
        <Cart cart={cart} removeProduct={removeProduct} />
      </>}

      {cart.length !== 0 && <>
        <Checkout setCart={setCart} />
      </>}
    </>
  )
}

export default App
