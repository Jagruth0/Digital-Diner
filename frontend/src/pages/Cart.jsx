import axios from "axios";
import { useState,useEffect } from "react";
import {Outlet, Link} from "react-router-dom";

function Cart() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var total = 0;
    

    useEffect(()=>{
        axios.get(`http://localhost:8080/cart`)
            .then((res)=>{
                setCart(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        },[]);
        
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    if (!cart.length) return <div className="cartitems"> No items in Cart </div>

    cart.map((i)=>{
        total += (i[1]*i[2]);
    });

    return(
        <div>
            <ul>
                {cart.map((i)=>
                    <li className="cartitems">
                        <div className="cartitem">{i[0]} x{i[1]}</div>
                        <div className="itemtotal">${(Math.round(i[2]*i[1] * 100) / 100).toFixed(2)}</div>
                    </li>
                )}
                <li className="cartitems">
                    <div className="cartitem">Total: </div>
                    <div className="itemtotal">${(Math.round(total * 100) / 100).toFixed(2)}</div>
                </li>
            </ul>
            <div className="checkout">
                <div></div>
                <Link to="/checkout">Checkout</Link>
                <div></div>
            </div>
        </div>
    )
}

export default Cart