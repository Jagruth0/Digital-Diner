import { useState } from "react"
import axios from "axios";


function Item(props) {
    
    const [counter, setCounter] = useState(0);
    const [showButton, setShowButton] = useState(false);
    function addItem() {
        if(counter===0)
            setShowButton(true);
        setCounter(counter+1);
    }
    function removeItem() {
        if(counter===1)
            setShowButton(false);
        setCounter(counter-1);
    }

    return(
        <div className="item">
            <div className="itemname">{props.name}</div>
            <div className="itemprice">${parseFloat(props.price).toFixed(2)}</div>
            <div className="addtocart">
                {!showButton && <button className="addbutton" onClick={addItem}> Add </button>}
                {showButton && <button onClick={removeItem}> - </button>}
                {showButton && counter}
                {showButton && <button onClick={addItem}> + </button>}
            </div>
        </div>
    )
}

export default Item