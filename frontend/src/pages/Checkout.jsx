import axios from "axios";
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";


function Checkout() {

    const [name, setName] = useState("");
    const [phno, setPhno] = useState(0);
    const navigate = useNavigate();


    const submitForm = (event)=>{
        event.preventDefault();
        const user = {name, phno};

        axios
            .post("http://localhost:8080/checkout", user)
            .then(()=>{
                console.log("user data sent");
                axios
                    .post("http://localhost:8080/cart?action=empty")
                    .then(()=>{
                    console.log("cart cleared");
                    })
                    .catch((err)=>{
                        console.error(err);
                    });
                
                navigate("/history", {state: {user}});
            })
            .catch((err)=>{
                console.error(err);
            });
    }
    
    return(
        <div>
            <h3>Enter your details:</h3>
            <div className="form">

                <form onSubmit={submitForm}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />

                    <br />
                    <label htmlFor="phno">Phone Number:</label>
                    <input 
                        type="number" 
                        name="phno" 
                        id="phno"
                        value={phno}
                        onChange={(e)=> setPhno(e.target.value)}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    )
}

export default Checkout