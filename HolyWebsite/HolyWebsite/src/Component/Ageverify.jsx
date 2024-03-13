import React, { useState, useEffect } from 'react';
import '../CSSfiles/AgeVerify.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

export default function AgeVerify({ purchasedData, setPurchasedData, mailId, productName, packagesData ,BeverageData, TshirtData}) {

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
  const [confirmationData, setConfirmationData] = useState(null); // State to store confirmation data
  const [paymentInProgress, setPaymentInProgress] = useState(false); 


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

  useEffect(() => {
    fetchConfirmationData();
  }, [mailId]);
  
  // Fetch confirmation data function
  const fetchConfirmationData = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public/process-user-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mailId
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched Confirmation Data:", data); // Log fetched data
        setConfirmationData(data);
      })
      .catch(error => {
        console.error('Error fetching confirmation data:', error);
        // Handle error
      });
  };

  const handleMailIdChange = (e) => {
    let value = e.target.value.trim(); // Remove leading and trailing spaces
    // Ensure only digits are entered
    value = value.replace(/\D/g, '');
    // Ensure length does not exceed 10 characters
    value = value.slice(0, 10);
    setFormDataDetails((prevData) => ({
      ...prevData,
      Phonenumber: value,
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
      alert("enter a valid code");
    }
    console.log('Coupon Code:', couponCode);
    // Here you can also send the coupon data to the server if needed
  };
  const handleNextClick = () => {
    if (!formDataDetails.Phonenumber || formDataDetails.Phonenumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return; // Prevent further execution
    }
    if (paymentInProgress) {
      return; // Do nothing if payment is already in progress
    }
    if (!confirmationData) {
      // If confirmation data is not fetched yet, return and wait for it
      alert('Please wait while we fetch confirmation data.');
      return;
    }
    setActiveTab('payment');
    setPaymentInProgress(true); // Set payment in progress
  
    if (formDataDetails.vegCount + formDataDetails.nonVegCount !== totalQuantity) {
      alert('Please select the correct number of packages for both Veg and Non-Veg.');
      setActiveTab('details');
      setPaymentInProgress(false); // Reset payment progress state
      return;
    }
  
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
      pass_selected: packagesData,
      age: formDataDetails.age,
      phone: formDataDetails.Phonenumber,
      food: foodArray,
      bravery: BeverageData,
      tshirt: TshirtData
    };
  
    console.log('Data to be sent:', postData); // Log the data before making the request
  
    // Make the POST request to the second API endpoint
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
  
          // After the second API request is completed successfully,
          // fetch confirmation data and then set the active tab to 'payment'
          fetchConfirmationData()
            .then(() => {
              setActiveTab('payment');
            })
            .catch(error => {
              console.error('Error fetching confirmation data:', error);
              // Handle error if fetching confirmation data fails
            });
        } else {
          // Handle other responses or errors from the second API request
          console.error('Operation failed:', data.responce);
          alert('Operation failed: ' + data.responce);
        }
      })
      .catch(error => {
        // Handle other errors from the second API request
        console.error('Error:', error);
      })
      .finally(() => {
        setPaymentInProgress(false); // Reset payment progress state
      });
  };
  
  const handlePayNowClick = () => {
    // Prepare the payload
    const payload = {
      email: mailId
    };
  
    // Make the POST request
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public/process-confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle response data
        // console.log('Payment response:', data);
        // console.log('Payment successful:', data);
        // Check if the response indicates success
        if (data && data.success) {
          // Navigate to success page
          history.push('/success');
        } else {
          // Handle failure scenario
          // console.error('Payment failed:', data.error);
  
          // Optionally display an error message to the user
        }
      })
      .catch(error => {
        console.error('Error making payment:', error);
        // Handle error
      });
  };
  
  
  const Globalvalue = (pass) => {
    if(pass === "pass_type_1" ) {
      return "Premium Pass"
    }
    if(pass === "pass_type_2" ) {
      return "Gold Pass"
    }
    if(pass === "pass_type_3" ) {
      return "Silver Pass"
    }
  }
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
        {activeTab === 'payment' && confirmationData && (
  <div>
    {/* Render purchased data */}
    <ul>
    {confirmationData.pass_selected.map((pass, index) => (
        <li key={index}>
          {Globalvalue(pass)} {/* Render pass type using the Globalvalue function */}
        </li>
      ))}
    </ul>
    {/* Display confirmation data */}
    <div className="main-payment">
      <div className="subtotal">
        <p>Subtotal: </p>
        <p>₹{confirmationData.subtotal}</p>
      </div>
      <div className="gst">
        <p>Handling fee: </p>
        <p>₹{confirmationData.gst}</p>
      </div>
      <div className="handling">
        <p>Transaction fee:</p>
        <p>₹{confirmationData.handling_fee}</p>
      </div>
      <div className="total">
        <p>Total: </p>
        <p>₹{confirmationData.total}</p>
      </div>
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
      <div className="main-age-section">
    {/* Rest of your code */}
    {activeTab === 'details' ? (
      <button className="Next-ph2" onClick={handleNextClick}>
        Next
      </button>
    ) : (
      <Link to='/sucsess'> <button className="Next-ph1" onClick={() => handlePayNowClick(mailId)} disabled={paymentInProgress}  >
        Pay Now
      </button></Link>
     
    )}
  </div>
    </div>
  );
}
