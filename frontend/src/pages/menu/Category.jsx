import axios from "axios";
import { useState,useEffect } from "react";
import Item from "./Item";

function Category(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8080/menu?category=${props.name}`)
            .then((res)=>{
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        },[]);
        
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
        
    return (
        <div>
            <h3>{props.name}</h3>
            <ul>
                {items.map((s)=>
                <li>
                    <Item name={s.item} price={s.price} />
                </li>
                )}
            </ul>
        </div>
    )
}

export default Category