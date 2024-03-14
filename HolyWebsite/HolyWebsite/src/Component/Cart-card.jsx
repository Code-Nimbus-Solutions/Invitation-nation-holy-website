import React, { useState, useEffect } from 'react';
import '../CSSfiles/Cart.css';
import PhoneNumber from './Phone-number';

export default function CartCard({ productName }) {
  const [quantity, setQuantity] = useState([0,0,0]);
  const [selectedOption, setSelectedOption] = useState(`See what's included`);
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
    // Calculate total quantity selected
    if (!offerData) {
      console.error('Offer data is not available yet.');
      return;
    }
    const totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0);
  
    // Check if any packages are added
    if (totalQuantity > 0) {
      // Prepare the packages array
      const packages = [];
      const Beverage = [];
      const Tshirt = [];
  
      // Iterate over purchased data to create packages
      quantity.forEach((qty, index) => {
        const productName = Object.keys(offerData.pass_price)[index];
       
  
        for (let i = 0; i < qty; i++) {
          packages.push(productName);
          Beverage.push("yes");
          Tshirt.push("yes"); // Pushing only the product name
        }
      });
  
      // Set the current state to 'input'
      setCurrentState('input');
  
      // Set packages data state
      setPackagesData(packages);
      setBeverageData(Beverage);
      setTshirtData(Tshirt);
  
      // Set purchasedData with the total quantity
      const purchasedItem = { productName, quantity: totalQuantity };
      setPurchasedData([purchasedItem]);
    } else {
      alert('Please add at least one package to proceed');
    }
  };
  
  const Globalvalue = (type) => {
    if(type === "pass_type_1") {
      return "Premium Pass";
    }
    if(type === "pass_type_2") {
      return "Elite Pass";
    }
    if(type === "pass_type_3") {
      return "Standard Pass";
    }
  }

  return (
    <div className="main-cart-card">
      <div className="card-container">
        {currentState === 'display' && offerData && (
          <>
            {Object.keys(offerData.pass_price).map((type, i) => {
              const originalPrice = offerData.pass_price[type];
              const discountPercentage = offerData.offer_persent;
              const discountedPrice = Math.floor(originalPrice - (originalPrice * (discountPercentage / 100)));
              return (
                <><div className="cart-card" key={i}>
                  <div className="product-name">
                    <h1 value={type}>{Globalvalue(type)}</h1>
                    <h2>
                      <p className="dis">₹{Math.floor(originalPrice)}</p>
                      <p>₹{discountedPrice}</p>
                    </h2>
                  </div>
                  <div className="order-basket">
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(i)}>-</button>
                      <span className="quantity">{quantity[i] || 0}</span>
                      <button onClick={() => handleIncrement(i)}>+</button>
                    </div>
                    <button className="add-button" onClick={() => handleIncrement(i)}>Add</button>
                  </div>
                </div><div className="dropdown-container">
                    <div className="dropdown-header" onClick={() => handleToggleDropdown(i)}>
                      <span>{selectedOption}</span>
                      <i className={`fas fa-chevron-${openDropdowns[i] ? 'up' : 'down'}`}></i>
                    </div>
                    {openDropdowns[i] && (
                      <div className="dropdown-list">
                        <div><i className="fa-solid fa-check"></i>   Free lunch ( Veg & Non veg )</div>
                        <div><i className="fa-solid fa-check"></i>   Free Organic Colors</div>
                        <div><i className="fa-solid fa-check"></i>   Free Access to Rain dance</div>
                        <div><i className="fa-solid fa-check"></i>   Access to Paid Fun Activities</div>
                        <div className='Priced'><i className="fa-solid fa-check"></i>  Free Drink</div>
                        <div className='Priced'><i className="fa-solid fa-check"></i>  Free T-shirt ( White )</div>
                        <button className="close-drop" onClick={() => handleToggleDropdown(i)}>Close</button>
                      </div>
                    )}
                  </div></>
              );
            })}
            <button className="next" onClick={handleNextClick}>Next</button>
          </>
        )}
        {currentState !== 'display' && <PhoneNumber purchasedData={purchasedData} productName={productName}  packagesData={packagesData} BeverageData={BeverageData} TshirtData={TshirtData} />}
      </div>
    </div>
  );
}
