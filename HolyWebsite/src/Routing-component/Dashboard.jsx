import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const dataJson = [
    {
      id: 1,
      name: "Pranav",
      date: "12 May,2024",
      email: "pranav@codenimbussolutions.com",
      phone: 8197522701,
      amount: 1000,
      status: "paid",
      food: "veg",
    },
    {
      id: 2,
      name: "Harish",
      date: "12 May,2024",
      email: "harish@codenimbussolutions.com",
      phone: 8197522701,
      amount: 2000,
      status: "in-cart",
      food: "veg",
    },
    {
      id: 3,
      name: "Teju",
      date: "12 May,2024",
      email: "pranav@codenimbussolutions.com",
      phone: 8197522701,
      amount: 4000,
      status: "in-cart",
      food: "veg",
    },
    {
      id: 4,
      name: "Dushyanth",
      date: "12 May,2024",
      email: "dushyanth@codenimbussolutions.com",
      phone: 8197522701,
      amount: 5000,
      status: "paid",
      food: "veg",
    },
    {
      id: 5,
      name: "Harsha",
      date: "12 May,2024",
      email: "harsha@codenimbussolutions.com",
      phone: 8197522701,
      amount: 1000,
      status: "paid",
      food: "non-veg",
    },
    {
      id: 6,
      name: "Danush",
      date: "12 May,2024",
      email: "danush@codenimbussolutions.com",
      phone: 8197522701,
      amount: 1000,
      status: "in-cart",
      food: "non-veg",
    },
  ];

  const total = 10;

  const cart_total = dataJson.filter((data) => data.status === "in-cart");
  const paid_total = dataJson.filter((data) => data.status === "paid");
  const veg_total = paid_total.filter((data) => data.food === "veg");
  return (
    <>
      <section id="analytics-section">
        <div className="nimbus-container">
          <div className="analytics-container">
            <div className="analytics-element">
              <span>{total}</span>
              <h3>Total number of visitors</h3>
            </div>
            <div className="analytics-element">
              <span>{cart_total.length}</span>
              <h3>Added to cart</h3>
            </div>
            <div className="analytics-element">
              <span>{paid_total.length}</span>
              <h3>Confirmed orders</h3>
            </div>
            <div className="analytics-element">
              <span>{veg_total.length}</span>
              <h3>Veg orders</h3>
            </div>
            <div className="analytics-element">
              <span>{paid_total.length - veg_total.length}</span>
              <h3>Non-veg orders</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard-section">
        <div className="nimbus-container">
          <div className="dashboard-container">
            <div className="dashboard-filters">
              {/* <button onClick={}></button>
              <button onClick={}></button>
              <button onClick={}></button> */}
            </div>
            <ul className="dashboard-header">
              <li>Name</li>
              <li>Order no</li>
              <li>Date</li>
              <li>Email</li>
              <li>Amount</li>
              <li>Status</li>
              <li>Food Type</li>
            </ul>
            {dataJson.map((element) => {
              return (
                <ul className="dashboard-element" key={element.id}>
                  <li className="name">{element.name}</li>
                  <li className="order-id">{element.id}</li>
                  <li className="date">{element.date}</li>
                  <li className="email">{element.email}</li>
                  <li className="amount">{element.amount}</li>
                  <li className="status">{element.status}</li>
                  <li className="food-type">{element.food}</li>
                </ul>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
