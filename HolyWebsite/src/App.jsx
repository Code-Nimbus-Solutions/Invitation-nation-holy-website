import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HeroSection from './Routing-component/Hero-section'
import Payment from './Routing-component/Payment';

function App() {


  return (
    <>
    <div className="main-App">
      <Router>
        <Routes>
          <Route path='/'  element={<HeroSection />}/>
          <Route path='/payment' element={<Payment/>}/>
        </Routes>
      </Router>
      
    </div>
 
    </>
  )
}

export default App
