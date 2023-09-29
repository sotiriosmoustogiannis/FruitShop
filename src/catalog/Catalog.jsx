import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './catalogStyles.css'


function Catalog({ products, addToCart }) {

  const [formData, setFormData] = useState([])


  const handleChange = (evt, id) => {
    const { name, value } = evt.target;
    setFormData((currData) => {
      // Find the index of the item with the given id in the current formData
      const index = currData.findIndex((data) => data.id === id);

      if (index !== -1) {
        // If the item with the given id exists in formData, update it
        return currData.map((data, i) =>
          i === index ? { ...data, [name]: value } : data
        );
      } else {
        // If the item with the given id doesn't exist, add it
        return [...currData, { id, [name]: value }];
      }
    });
  };

  const handleSubmit = (event, product) => {
    event.preventDefault();

    const newProduct = {
      product: product.name,
      quantity: formData.find(data => data.id === product.id)?.quantity || 0,
      price: product.price,
    };
    newProduct.totalPrice = newProduct.price * newProduct.quantity / 100;

    addToCart(newProduct)

    setFormData((currData) => {
      const updatedData = currData.filter((data) => data.id !== product.id);
      return updatedData;
    });
  };


  return (
    <div>
      <h3>Poduct Catalog</h3>
      {products.map((product) => (
        <Card className="productCard" key={product.id}>
          <Card.Body>{product.name}</Card.Body>
          <form
            key={product.id}
            onSubmit={(e) => handleSubmit(e, product)}>

            <input
              type="number" id="quantity"
              placeholder="quantity (kg)"
              name="quantity"
              onChange={(e) => handleChange(e, product.id)}
              value={formData.find((data) => data.id === product.id)?.quantity || "quantity"} />

            <Button type="submit" variant="primary">Add to cart</Button>
          </form>
        </Card>
      )
      )}

    </div>
  )
}

export default Catalog
