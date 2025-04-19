import axios from "axios";
import { useState,useEffect } from "react";

function Category(props) {
    const [starters, setStarters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8080/menu?category=${props.name}`)
            .then((res)=>{
                setStarters(res.data);
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
                {starters.map((s)=><li> {s.item}............................................................. ${s.price}</li>)}
            </ul>
        </div>
    )
}

export default Category