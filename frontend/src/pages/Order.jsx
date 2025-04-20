

function Order(props) {
    
    const cart = props.cart;
    var total = 0;

    cart.map((i)=> total += (i[1]*i[2]));

    return (
        <div>
            <ul>
                {cart.map((item)=>
                    <li>
                        {item[1]}x {item[0]}
                    </li>
                )}
                <li>
                    Total: ${(Math.round(total * 100) / 100).toFixed(2)}
                </li>
            </ul>
        </div>
    )
}

export default Order