import React from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


function CatalogFooter({ calculateTotalPrice, countSelectedProducts, toCart }) {
  return (
    <div className='catalog-footer'>
      <div className='cart-button'>
        <div className="button-container">
          {/* Go to cart button */}
          <Button onClick={toCart} size="lg" variant="primary">
            Go to cart
          </Button>
          {/* Display the total count of the products in cart */}
          <Badge bg="dark" className="badge-position badge-lg" style={{ fontSize: '16px' }}>{countSelectedProducts()}</Badge>
        </div>
      </div>
      <div>
        {/* Display to total price */}
        <h6>Total Price: {calculateTotalPrice()}€</h6>
      </div>
    </div>
  )
}

export default CatalogFooter