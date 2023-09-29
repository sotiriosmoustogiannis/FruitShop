import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Catalog from './catalog/Catalog.jsx'
import Cart from './cart/Cart.jsx'
import Checkout from './checkout/Checkout.jsx'
import { v4 as uuid } from 'uuid';


const productUrl = 'https://demo0336234.mockable.io/products'


function App() {

  const [component, setComponent] = useState(["catalog"])

  const toCatalog = () => {
    setComponent("catalog")
  }

  const toCart = () => {
    setComponent("cart")
  }

  const toCheckout = () => {
    setComponent("checkout")
  }

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
    setComponent("catalog")
  }, [])

  useEffect(() => {

  }, [component])



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
      <h1>Fruit Shop</h1>
      {products && component === "catalog" && <>
        <Catalog products={products} addToCart={addToCart} toCart={toCart} />
      </>}
      {component === "cart" && <>
        <Cart cart={cart} removeProduct={removeProduct} toCatalog={toCatalog} toCheckout={toCheckout} />
      </>}

      {cart.length !== 0 && component === "checkout" && <>
        <Checkout setCart={setCart} toCart={toCart} setComponent={setComponent} />
      </>}
    </>
  )
}

export default App
