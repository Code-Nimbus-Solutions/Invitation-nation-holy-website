import { Link } from 'react-router-dom'
import '../CSSfiles/Sucess.css'
export default function Paymentsucess(){
    return(
        <div className="payment-section">
            <div className="payment container">
                <div className="image-container">
                    <div className="sucess-card-container">
                       <img src="" alt="" className="sucess" />
                       <Link to='/scan'>
                        <button>Scanner</button>
                       </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}