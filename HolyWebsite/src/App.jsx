import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HeroSection from './Routing-component/Hero-section'
import Payment from './Routing-component/Payment';
import Paymentsucess from './Component/payment-sucess';
import PaymentFail from './Component/payment-fail';

function App() {


  return (
    <>
    <div className="main-App">
      <Router>
        <Routes>
          <Route path='/'  element={<HeroSection />}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/sucsess' element={<Paymentsucess/>}/>
          <Route path='/' element={<PaymentFail/>}/>
        </Routes>
      </Router>
      
    </div>
 
    </>
  )
}

export default App
