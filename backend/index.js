import express from "express";
import pg from "pg";
import env from "dotenv";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
env.config();

var cart = [];


mongoose.connect(process.env.MONGO_URL)
    .then((res)=>{console.log("Connected to MongoDB");})
    .catch((err)=>{console.error(err);});

const menuSchema = new Schema({
    item: String,
    category: String,
    price: Number
});

const Menu = model("Menu", menuSchema, "menu");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();


app.get("/menu", async(req, res)=>{
    const cate = req.query.category;
    const items = await Menu.find({category: cate}, {_id:0});
    // console.log(items);
    res.json(items);
});

app.get("/cart", (req, res)=>{

    res.json(cart);
});

app.get("/orders", async(req, res)=>{
    try {
        const phn = req.query.user;
        // console.log(phn);
        const result = await db.query("SELECT cart FROM orders WHERE phoneno = $1", [phn]);
        // console.log(result.rows);
        res.json(result.rows);

    } catch (err) {
        console.log(err);
    } 
})


app.post("/cart", (req, res)=>{
    if (req.query.action === "empty") {
        cart = [];
    }
    else{
        const item = req.body;
        // console.log(item);
        
        let i = cart.findIndex((it)=> {return it[0] === item.name;});
        if(req.query.action === "add"){
            if(i===-1)
                cart.push([item.name,1,item.price]);
            else
                cart[i][1]++;
        }
        if(req.query.action === "remove"){
            if(cart[i][1]===1)
                cart.splice(i,1);
            else
                cart[i][1]--;
        }
    }
    // console.log(cart);
    res.status(200).json({ cart });
});


app.post("/checkout", async(req,res)=>{
    // console.log(req.body);
    const user = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE phone = $1", [user.phno]);

        if(result.rows.length <= 0){
            await db.query("INSERT INTO users (name, phone) VALUES ($1, $2)", [user.name, user.phno]);
        }
        await db.query(`INSERT INTO orders (phoneno, cart) VALUES ($1, $2)`, [user.phno, JSON.stringify(cart)]);
    } catch (err) {
        console.log(err);
        
    }

    res.status(200).json({message: "Received order"});
});


app.listen(port, ()=>{
    console.log(`Running on port: ${port}`);
});



// function Dbarr(inputString) {

//     const newTemp = inputString.replace(/"/g, "'");
//     return newTemp;

// }