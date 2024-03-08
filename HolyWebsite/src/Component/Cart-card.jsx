import React, { useState, useEffect } from 'react';
import '../CSSfiles/Cart.css';
import productsData from './Card-Data';
import PhoneNumber from './Phone-number';
import AgeVerify from './AgeVerify'; // Assuming you have implemented AgeVerify component

export default function CartCard({ productName }) {
  const [quantity, setQuantity] = useState(new Array(productsData.length).fill(0));
  const [selectedOption, setSelectedOption] = useState('choose');
  const [purchasedData, setPurchasedData] = useState([]);
  const [currentState, setCurrentState] = useState('display'); // 'display' or 'input'
  const [offerData, setOfferData] = useState(null); // State to store offer data

  useEffect(() => {
    // Fetch offer data from the API
    fetch('http://192.168.68.102:8080/rest/api/public')
      .then(response => response.json())
      .then(data => setOfferData(data))
      .catch(error => console.error('Error fetching offer data:', error));
  }, []);

  const handleIncrement = (index) => {
    setQuantity(prevState => {
      const newQuantity = [...prevState];
      newQuantity[index] = (newQuantity[index] || 0) + 1;
      return newQuantity;
    });
  };
  
  const handleDecrement = (index) => {
    if (quantity[index] > 0) {
      setQuantity(prevState => {
        const newQuantity = [...prevState];
        newQuantity[index] = newQuantity[index] - 1;
        return newQuantity;
      });
    }
  };
  
  const handleAddToCart = (productName, productIndex) => {
    const product = productsData[productIndex];
    if (product) {
      const productQuantity = quantity[productIndex];
      if (productQuantity <= 0) {
        alert('Quantity must be greater than 0');
        return;
      }
  
      const updatedData = [...purchasedData, { productName, quantity: productQuantity, price: product.price }];
      setPurchasedData(updatedData);
  
      // Reset quantity to 0 after adding to cart
      const newQuantity = [...quantity];
      newQuantity[productIndex] = 0;
      setQuantity(newQuantity);
  
      console.log(`Added ${productQuantity} ${productName} to cart`);
    } else {
      console.error(`Product "${productName}" not found in productsData.`);
    }
  };
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextClick = () => {
    // Check if any product's quantity is greater than 0
    if (purchasedData.length === 0 || purchasedData.every(item => item.quantity === 0)) {
      alert('Please add at least one product to proceed');
      return;
    }
    
    // Fetch and display purchased data
    console.log('Purchased Data:', purchasedData);
    // You can further process the purchased data here
    setCurrentState('input');
  };

  return (
    <div className="main-cart-card">
      <div className="card-container">
        {currentState === 'display' ? (
          <>
            {productsData.map((product, index) => (
             
              <React.Fragment key={index}>
                {offerData && Object.keys(offerData.pass_price).map((type, i) => (
                      <><option key={i} value={type}>{type} - ₹{offerData.pass_price[type]}</option><div className="cart-card">
                    <div className="product-name">
                      <h1>{product.productName}</h1>
                      <h2>₹{product.price}</h2> {/* Display the product price */}
                    </div>
                    <div className="order-basket">
                      <div className="quantity-controls">
                        <button onClick={() => handleDecrement(index)}>-</button>
                        <span className="quantity">{quantity[index] || 0}</span>
                        <button onClick={() => handleIncrement(index)}>+</button>
                      </div>
                      <button className="add-button" onClick={() => handleAddToCart(product.productName, index)}>Add</button>
                    </div>
                  </div><div className="dropdown-container">
                      <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
                        <option value="choose">See what's included</option>

                      </select>
                    </div></>
                    ))}
               
              </React.Fragment> 
            ))}
            <button className="next" onClick={handleNextClick}>Next</button>
          </>
        ) : (
          <PhoneNumber purchasedData={purchasedData}/>
        )}
      </div>
    </div>
  );
}
