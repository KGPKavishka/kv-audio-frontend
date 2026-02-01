import axios from "axios";
import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        console.log(email,password);

        axios.post("http://localhost:3000/api/users/login",
            {
            email: email,
            password: password
            }
        ).then((response) => {
            console.log(response);
            toast.success("Login Successful");
            const user = response.data.user

            if(user.role === "admin"){
                navigate("/admin/")
            } else {
                navigate("/")
            }

        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.error); 
        });
    }


    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">

            <form onSubmit={handleSubmit}>

            <div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center relative">

                <img src="/logo.png" alt="Logo" className="w-[150px] h-[150px] object-cover" />
                <input 
                    type="email" 
                    placeholder="Email"
                    className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                    value={email}
                    onChange={
                    (e) => {
                        setEmail(e.target.value);
                        }
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-10"
                    value={password}
                    onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    }
                />

                <button className="w-[150px] h-[40px] bg-[#efac38] text-white text-xl font-bold rounded-xl mt-10 hover:bg-red-700 transition duration-300">
                    Login
                </button>

            </div>
            </form>

        </div>
    )
}