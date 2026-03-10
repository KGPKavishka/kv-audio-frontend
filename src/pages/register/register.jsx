import axios from "axios";
import "./register.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        console.log({
            email,
            password,
            firstName,
            lastName,
            address,
            phone
        });
        
        axios.post(`${backendUrl}/api/users/`,{
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password,
            address : address,
            phone : phone
        }).then((res)=>{
            toast.success("Registration successful!");
            navigate("/login");
        }).catch((err)=>{
            toast.error(err?.response?.data?.error||"An error occurred while registering.");
        })

    }

    return(
        <div className="bg-picture h-screen flex items-center justify-center">

            <form onSubmit={handleSubmit}>

                <div className="w-[400px] h-[600px] backdrop-blur-xl rounded-xl flex flex-col items-center justify-center">

                    <img src="/logo.png" alt="Logo" className="w-[130px] h-[130px] object-cover mb-5" />

                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    />

                    <button className="w-[150px] h-[40px] bg-[#efac38] text-white text-xl font-bold rounded-xl mt-8 hover:bg-red-700 transition duration-300">
                        Register
                    </button>

                </div>

            </form>

        </div>
    )
}