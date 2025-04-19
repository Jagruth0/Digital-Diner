import express from "express";
import pg from "pg";
import env from "dotenv";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const app = express();
const port = 8080;
env.config();


mongoose.connect(process.env.MONGO_URL)
    .then((res)=>{console.log("Connected to MongoDB");})
    .catch((err)=>{console.error(err);});

const menuSchema = new Schema({
    item: String,
    category: String,
    price: Number
});

const Menu = model("Menu", menuSchema, "menu");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get("/menu", async(req, res)=>{
    const cate = req.query.category;
    const items = await Menu.find({category: "Starters"}, {_id:0});
    console.log(items);
    res.json(items);
})

app.listen(port, ()=>{
    console.log(`Running on port: ${port}`);
});