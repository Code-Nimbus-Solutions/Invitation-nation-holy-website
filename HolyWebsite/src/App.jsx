import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HeroSection from "./Routing-component/Hero-section";
import Payment from "./Routing-component/Payment";
import Dashboard from "./Routing-component/Dashboard";
import Login from "./Routing-component/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
