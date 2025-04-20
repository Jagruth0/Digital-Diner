import { useState, useEffect } from "react"
import axios from "axios";


function Item(props) {
    
    const [counter, setCounter] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(()=>{
        let i = cart.findIndex((item)=> {return item[0] === props.name;});
        if(i>=0 && counter !== cart[i][1]) {
            setCounter(cart[i][1]);
            setShowButton(true);
        }
    },[cart, props.name]);
        
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    function addItem() {
        setCounter(prevcounter => {
            const newcounter = prevcounter+1;
            setShowButton(newcounter > 0);
            return newcounter;
        });
        axios
            .post("http://localhost:8080/cart?action=add", props)
            .then(()=>{
                    console.log("added item to cart")
                }
            )
            .catch((err) => {
                console.error(err);
            });
    }


    function removeItem() {
        setCounter(prevcounter =>{
            const newcounter = prevcounter-1;
            setShowButton(newcounter > 0);
            return newcounter;       
        });

        axios
            .post("http://localhost:8080/cart?action=remove", props)
            .then(()=>{
                    console.log("removed item from cart")
                }
            )
            .catch((err) => {
                console.error(err);
            });
    }

    return(
        <div className="item">
            <div className="itemname">{props.name}</div>
            <div className="itemprice">${parseFloat(props.price).toFixed(2)}</div>
            <div className="addtocart">
                {!showButton && <button className="addbutton" onClick={addItem}> Add </button>}
                {showButton && <button onClick={removeItem}> - </button>}
                {showButton && <span>{counter}</span>}
                {showButton && <button onClick={addItem}> + </button>}
            </div>
        </div>
    )
}

export default Item