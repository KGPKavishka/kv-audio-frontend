import { Link } from "react-router-dom";

export default function ErrorNotFound(){
    return (
        <div> 
            <h1>404 Error</h1>
            <Link className="bg-[#efac38] p-1" to="/"> Go to Home Page </Link>
        </div>
    )
}