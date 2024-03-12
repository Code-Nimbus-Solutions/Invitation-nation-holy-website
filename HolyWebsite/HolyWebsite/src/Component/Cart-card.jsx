import React, { useState, useEffect } from 'react';
import '../CSSfiles/Cart.css';
import PhoneNumber from './Phone-number';

export default function CartCard({ productName }) {
  const [quantity, setQuantity] = useState([]);
  const [selectedOption, setSelectedOption] = useState('choose');
  const [purchasedData, setPurchasedData] = useState([]);
  const [currentState, setCurrentState] = useState('display'); // 'display' or 'input'
  const [offerData, setOfferData] = useState(null); // State to store offer data
  const [packagesData, setPackagesData] = useState([]); 
  const [BeverageData, setBeverageData] = useState([]); 
  const [TshirtData, setTshirtData] = useState([]); 
  const [openDropdowns, setOpenDropdowns] = useState([]); // State to manage open dropdowns

  useEffect(() => {
    // Fetch offer data from the API
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public`)
      .then(response => response.json())
      .then(data => setOfferData(data))
      .catch(error => console.error('Error fetching offer data:', error));
  }, []);

  useEffect(() => {
    // Save purchasedData to localStorage whenever it changes
    localStorage.setItem('purchasedData', JSON.stringify(purchasedData));
  }, [purchasedData]);

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
    // Check if the product exists in offerData
    if (!offerData || !offerData.pass_price.hasOwnProperty(productName)) {
      console.error(`Product "${productName}" not found in offerData.`);
      return;
    }
  
    const productPrice = offerData.pass_price[productName];
    const productQuantity = quantity[productIndex];
    
    // Prevent adding if the counter is not greater than 0
    if (productQuantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
  
    // Prepare the purchased item with the product name and quantity
    const purchasedItem = { productName, quantity: productQuantity, price: productPrice };
  
    // Add the purchased item to the purchasedData array
    setPurchasedData(prevData => [...prevData, purchasedItem]);
  
    // Reset quantity to 0 after adding to cart
    const newQuantity = [...quantity];
    newQuantity[productIndex] = 0;
    setQuantity(newQuantity);
  
    console.log(`Added ${productQuantity} ${productName} to cart`);
  };
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleToggleDropdown = (index) => {
    setOpenDropdowns(prevOpen => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index]; // Toggle the state of the clicked dropdown
      return updatedOpen;
    });
  };

  const handleNextClick = () => {
    // Check if any packages are added
    if (purchasedData.length === 0) {
      alert('Please add at least one package to proceed');
      return;
    }
    
    // Prepare the packages array
    const packages = [];
    const Beverage =[];
    const Tshirt =[];
  
    // Iterate over purchased data to create packages
    purchasedData.forEach(item => {
      const { productName, quantity } = item;
      for (let i = 0; i < quantity; i++) {
        packages.push(productName);
        Beverage.push("yes") 
        Tshirt.push("yes")// Pushing only the product name
      }
    });
  
    // Log the packages
    console.log('Packages:', packages);
    console.log('Beverage:', Beverage);
    console.log('Tshirt:', Tshirt);
  
    // Set the current state to 'input'
    setCurrentState('input');
  
    // Set packages data state
    setPackagesData(packages);
    setBeverageData(Beverage);
    setTshirtData(Tshirt)
  };
  
  const Globalvalue = (type) => {
    if(type == "pass_type_1" ) {
      return "Premium Pass"
    }
    if(type == "pass_type_2" ) {
      return "Gold Pass"
    }
    if(type == "pass_type_3" ) {
      return "Silver Pass"
    }
  }

  return (
    <div className="main-cart-card">
      <div className="card-container">
        {currentState === 'display' && offerData ? (
          <>
            {Object.keys(offerData.pass_price).map((type, i) => (
              <><div className="cart-card" key={i}>
                <div className="product-name">
                  <h1 value={(type)}>{Globalvalue(type)}</h1>
                  <h2>₹{offerData.pass_price[type]}</h2> {/* Display the offer price */}
                </div>
                <div className="order-basket">
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(i)}>-</button>
                    <span className="quantity">{quantity[i] || 0}</span>
                    <button onClick={() => handleIncrement(i)}>+</button>
                  </div>
                  <button className="add-button" onClick={() => handleAddToCart(type, i)}>Add</button>
                </div>
              </div><div className="dropdown-container">
                  <div className="dropdown-header" onClick={() => handleToggleDropdown(i)}>
                    <span>{selectedOption}</span>
                    <i className={`fas fa-chevron-${openDropdowns[i] ? 'up' : 'down'}`}></i>
                  </div>
                  {openDropdowns[i] && (
                    <div className="dropdown-list">
                      <div><i className="fa-solid fa-check"></i>  Free lunch ( Veg & Non veg )</div>
                      <div><i className="fa-solid fa-check"></i>  Free Organic Colors</div>
                      <div><i className="fa-solid fa-check"></i>  Free Access to Rain dance</div>
                      <div><i className="fa-solid fa-check"></i>  Access to Paid Fun Activities</div>
                      <div className='Priced'><i className="fa-solid fa-check"></i>  Free Drink</div>
                      <div className='Priced'><i className="fa-solid fa-check"></i>  Free T-shirt ( White )</div>
                    </div>
                  )}
                </div></>
            ))}
            <button className="next" onClick={handleNextClick}>Next</button>
          </>
        ) : (
          <PhoneNumber purchasedData={purchasedData} productName={productName}  packagesData={packagesData} BeverageData={BeverageData} TshirtData={TshirtData} />
        )}
      </div>
    </div>
  );
}
