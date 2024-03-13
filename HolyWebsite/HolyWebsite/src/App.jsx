import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HeroSection from './Routing-component/Hero-section'
import Payment from './Routing-component/Payment';
import Paymentsucess from './Component/payment-sucess';
import PaymentFail from './Component/payment-fail';
import Dashboard from "./Routing-component/Dashboard";
import Login from "./Routing-component/Login";
import { useState } from "react";


function App() {
  const [mailId, setMailId] = useState('');
  return (
    <>
      <Router>
        <Routes>

          <Route path='/'  element={<HeroSection />}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/sucsess' element={<Paymentsucess mailId={mailId}/>}/>
          <Route path='/' element={<PaymentFail/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
