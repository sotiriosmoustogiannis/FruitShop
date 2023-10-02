import ProductCard from './ProductCard';
import './catalogStyles.css'
import CatalogFooter from './CatalogFooter';

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
        // Display CatalogFooter only if there are products in the catalog
        <CatalogFooter calculateTotalPrice={calculateTotalPrice} countSelectedProducts={countSelectedProducts} toCart={toCart} />
      )}
    </div>
  )
}

export default Catalog


