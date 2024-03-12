import '../CSSfiles/Sucess.css'
import Star from '/src/assets/Component 1.svg'
export default function Paymentsucess(){
    return(
        <div className="payment-section">
            <div className="payment container">
                <div className="image-container">
                    <div className="sucess-card-container">
                        <div className="image-cont">
                             <img src={Star} alt="" className="sucsess" />
                           
                        </div>
                        <h1>sucsess!</h1> 
                   
                     
                       
                    </div>
                    <div className="info-container">
                        <p className='nextstep'>Next Step ?</p>
                        <br />
                        <p className='payment'>payment link Has been  sent to your  email.</p>
                    </div>
                    <div className="share">
                        <button className='Share-content
                        '>Share</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}