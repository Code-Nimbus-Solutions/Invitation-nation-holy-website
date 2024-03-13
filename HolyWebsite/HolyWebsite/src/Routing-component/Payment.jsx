import CartCard from "../Component/Cart-card";
import CounterSection from "../Component/CounterSection";
import '../Routing-component/Dashboard.css'


export default function Payment(){
    return(
        <div className="nimbus-container">
            <div className="main-payment">
            <CounterSection/>
            <CartCard/>

        </div>
        </div>
        
    )
}