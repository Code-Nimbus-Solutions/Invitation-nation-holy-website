import { Link } from "react-router-dom";

export default function HeroSection(){
    return(
        <div className="main">
        <h1>
            Hero section
        </h1>
        <Link to='/payment' style={{textDecoration:"none"}}>
             <button className="book">Book</button>
        </Link>
       
    </div>
    )
    
}