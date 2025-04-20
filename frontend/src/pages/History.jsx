import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Order from "./Order";

function History() {
    const location = useLocation();
    const user = location.state?.user;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(()=>{
        axios.get(`http://localhost:8080/orders?user=${user.phno}`)
            .then((res)=>{
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        },[]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;    
    

    return(
        <div>
            <div>
                Your order has been placed!
            </div>
            <h4>Order History:</h4>
            {orders.map((ob)=>
                <div className="order-history">
                    <Order cart={ob.cart}/>
                </div>
            )}
        </div>
    )
}

export default History