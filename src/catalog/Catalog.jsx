import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';
import Badge from 'react-bootstrap/Badge';
import './catalogStyles.css'

// Catalog component that displays a list of products and a "Go to cart" button
function Catalog({ products, addToCart, countSelectedProducts, calculateTotalPrice, toCart }) {

  return (
    <div className='catalog'>
      <h3>Poduct Catalog</h3>
      {products.map((product) => (
        // Render ProductCard component for each product with product.product and addToCart function props
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      )
      )}
      {products.length > 0 && (
        // Display "Go to cart" button if there are products in the catalog
        <div className='catalog-footer'>
          <div className='cart-button'>
            <div className="button-container">
              <Button onClick={toCart} size="lg" variant="primary">
                Go to cart
              </Button>
              <Badge bg="dark" className="badge-position badge-lg" style={{ fontSize: '16px' }}>{countSelectedProducts()}</Badge>
            </div>
          </div>
          <div>
            <h6>Total Price: {calculateTotalPrice()}€</h6>
          </div>
        </div>
      )}
    </div>
  )
}

export default Catalog


