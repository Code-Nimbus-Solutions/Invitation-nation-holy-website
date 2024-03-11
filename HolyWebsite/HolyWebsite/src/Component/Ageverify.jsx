import React, { useState, useEffect } from 'react';
import '../CSSfiles/AgeVerify.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

export default function AgeVerify({ purchasedData, setPurchasedData, mailId,productName }) {
  const [activeTab, setActiveTab] = useState('details');
  const [formDataDetails, setFormDataDetails] = useState({
    Phonenumber: '',
    age: '',
    vegCount: 0,
    nonVegCount: 0,
    subtotal: 0,
    totalPrice: 0
  });
  const [couponCode, setCouponCode] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0); // State to store total quantity
  const [limit, setLimit] = useState(0); // State to store the limit for both veg and non-veg lunches

  useEffect(() => {
    // Calculate subtotal and total price whenever purchasedData changes
    let sub = 0;
    purchasedData.forEach((item) => {
      sub += item.price * item.quantity;
    });
    const gst = sub * 0.18; // Assuming GST is 18%
    const totalPrice = sub + gst;
    setFormDataDetails((prevData) => ({
      ...prevData,
      subtotal: sub,
      totalPrice: totalPrice
    }));

    // Calculate total quantity of purchased tickets
    let total = 0;
    purchasedData.forEach((item) => {
      total += item.quantity;
    });
    setTotalQuantity(total);

    // Set the limit based on the total quantity
    setLimit(total);
  }, [purchasedData]);

  const handleMailIdChange = (e) => {
    setFormDataDetails((prevData) => ({
      ...prevData,
      Phonenumber: e.target.value,
    }));
  };

  const handleAgeChange = (e) => {
    let value = e.target.value;
    // Ensure the value is not greater than 99
    if (value > 99) {
      value = 99;
    }
    setFormDataDetails((prevData) => ({
      ...prevData,
      age: value,
    }));
  };

  const handleIncrementVeg = () => {
    // Check if total quantity is less than the limit
    if (formDataDetails.vegCount + formDataDetails.nonVegCount < limit) {
      setFormDataDetails((prevData) => ({
        ...prevData,
        vegCount: prevData.vegCount + 1
      }));
    }
  };
  
  const handleIncrementNonVeg = () => {
    // Check if total quantity is less than the limit
    if (formDataDetails.vegCount + formDataDetails.nonVegCount < limit) {
      setFormDataDetails((prevData) => ({
        ...prevData,
        nonVegCount: prevData.nonVegCount + 1
      }));
    }
  };
  
  const handleDecrementVeg = () => {
    if (formDataDetails.vegCount > 0) {
      setFormDataDetails((prevData) => ({
        ...prevData,
        vegCount: prevData.vegCount - 1
      }));
    }
  };
  
  const handleDecrementNonVeg = () => {
    if (formDataDetails.nonVegCount > 0) {
      setFormDataDetails((prevData) => ({
        ...prevData,
        nonVegCount: prevData.nonVegCount - 1
      }));
    }
  };

  const handleApplyCoupon = () => {
    // Capture the coupon input data once "Apply" button is clicked
    if (!couponCode) {
      alert("enter  a valid code");
    }
    console.log('Coupon Code:', couponCode);
    // Here you can also send the coupon data to the server if needed
  };
  const handleNextClick = () => {
    // Prepare the data object to be sent
    const foodArray = [];
    
    // Push 'VEG' into foodArray based on vegCount
    for (let i = 0; i < formDataDetails.vegCount; i++) {
      foodArray.push('NOTOPTED');
    }
    
    // Push 'NONVEG' into foodArray based on nonVegCount
    for (let i = 0; i < formDataDetails.nonVegCount; i++) {
      foodArray.push('NONVEG');
    }
    
    const postData = {
      email: mailId,
      pass_selected: ["pass_type_1","pass_type_2"],
      age: formDataDetails.age,
      phone: formDataDetails.Phonenumber,
      food: foodArray,
      bravery: ["yes", "yes"],
      tshirt: ["yes", "yes"]
    };
    
    console.log('Data to be sent:', postData); // Log the data before making the request
    
    // Make the POST request to the API
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public/process-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.responceId === 'OS') {
        // Handle successful operation
        console.log('Operation successful:', data.responce);
        // Update UI to reflect the successful operation
        // For example, you can show a success message to the user
        alert('Operation successful: ' + data.responce);
        // Reset any form data or state if needed
      } else {
        // Handle other responses or errors
        console.error('Operation failed:', data.responce);
        alert('Operation failed: ' + data.responce);
      }
    })
    .catch(error => {
      // Handle other errors
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };
  
  
  
  
  
  
  return (
    <div className="main-age-section">
      <div className="main-age-container">
        <div className="main-container-age">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <h2>Details</h2>
              <p>for Next steps</p>
            </div>
            <div
              className={`tab ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <h2>Payment</h2>
              <p>for Next steps</p>
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'details' && (
              <div>
                <div className="main-input-container">
                  <label htmlFor="Mail">Number</label>
                  <input
                    type="number"
                    className="Mail"
                    placeholder=" Number"
                    value={formDataDetails.Phonenumber}
                    onChange={handleMailIdChange}
                  />
                  <label htmlFor="age">AGE</label>
                  <input
                    type="number"
                    placeholder="Age"
                    className="age"
                    value={formDataDetails.age}
                    onChange={handleAgeChange}
                  />
                </div>
                <p className='total-quantity'>Total Quantity of Purchased Tickets: {totalQuantity}</p>
                <div className="veg-nonveg">
                  <div className="veg-vegsection">
                    <p>No of veg lunch</p>
                    <div className="dynamic-part">
                      <button className="minus" value="NOTOPTED" onClick={handleDecrementVeg}>-</button>
                      <h1 value="NOTOPTED">{formDataDetails.vegCount}</h1>
                      <button className="plus" value="NOTOPTED" onClick={handleIncrementVeg}>+</button>
                    </div>
                  </div>
                  <div className="nonvegsection">
                    <p>No of Non-veg lunch</p>
                    <div className="dynamic-part">
                      <button className="minus" value="NONVEG" onClick={handleDecrementNonVeg}>-</button>
                      <h1 >{formDataDetails.nonVegCount}</h1>
                      <button className="plus" value="NONVEG" onClick={handleIncrementNonVeg}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'payment' && (
              <div>
                {/* Render purchased data */}
                <ul>
                  <div className="main-heading">
                  <p>Product </p>
                    <p>Subtotal</p>
                  </div>
                  {purchasedData.map((item, index) => (
                    <div className="main-payment" key={index}>
                      <div className="Product">
                        <p className="Product-name" key={index}>
                          {item.productName} × {item.quantity}
                        </p>
                        <p className="product-price" key={index}>
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </ul>
                {/* Display subtotal and total price */}
                <div className="subtotal">
                  <p>Subtotal </p>
                  <p> ₹{formDataDetails.subtotal.toFixed(2)}</p>
                </div>
                <div className="gst">
                  <p>GST (18%)</p>
                  <p>₹ {(formDataDetails.subtotal * 0.18).toFixed(2)}</p>
                </div>
                <div className="total">
                  <p>Total Price </p>
                  <p>₹{formDataDetails.totalPrice.toFixed(2)}</p>
                </div>
                <div className="razor-pay">
                  <h3>Pay by razorpay</h3>
                </div>
                <div className="coupons-input">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={handleApplyCoupon}>Apply </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {paymentSuccessful? <button className="Next-ph" onClick={handleNextClick}>
        Pay Now
      </button>:<button className="Next-ph" onClick={handleNextClick}>
        Pay Now
      </button>}
      
     
    </div>
  );
}