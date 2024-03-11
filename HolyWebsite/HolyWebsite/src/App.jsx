import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from './Routing-component/Hero-section'
import Payment from './Routing-component/Payment';
import Paymentsucess from './Component/payment-sucess';
import PaymentFail from './Component/payment-fail';
import Dashboard from "./Routing-component/Dashboard";
import Login from "./Routing-component/Login";
import QRScanner from "./Routing-component/Qrscanner";
import'./index.css'


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/'  element={<HeroSection />}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/sucsess' element={<Paymentsucess/>}/>
          <Route path='/' element={<PaymentFail/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<QRScanner/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
