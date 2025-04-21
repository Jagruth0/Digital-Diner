# Digital-Diner
Digital Diner helps small to medium restaurants improve their customer experience by allowing users to browse menu and place simple pickup orders online.

[**Netlify link:**](https://digital-dine.netlify.app/menu)


## Run backend locally

### Setting up DATABASE

**MongoDB**

create database:
```
use diner
```
create collection:
```
db.createCollection("menu")
```

Create Documents / Data:
```
db.menu.insertMany([{item: "Fried Hot Wings", category: "Starters", price: 5.97}, {item: "Mozzarella Sticks", category: "Starters", price: 4.71}, {item: "Scrambled Eggs", category: "Starters", price: 1.00}, {item: "Classic Burger", category: "Main", price: 3.04}, {item: "Cheese Burger", category: "Main", price: 4.08}, {item: "Spam Burger", category: "Main", price: 5.87}, {item: "Lamb Burger", category: "Main", price: 8.06}, {item: "Apple Pie", category: "Desserts", price: 5.97}, {item: "Banana Split Sundae", category: "Desserts", price: 4.71}, {item: "Cheesecake", category: "Desserts", price: 6.81}, {item: "Chocolate Mousse", category: "Desserts", price: 5.45}, {item: "Vanilla Shake", category: "Beverages", price: 3.50}, {item: "Chocolate Shake", category: "Beverages", price: 3.50}, {item: "Strawberry Shake", category: "Beverages", price: 3.50}, {item: "Coffee", category: "Beverages", price: 2.00}, {item: "Tea", category: "Beverages", price: 1.50}])
```

**postgres**

create users table:
```
CREATE TABLE users(
	name VARCHAR(50),
	phone BIGINT PRIMARY KEY
);
```

create orders table:
```
CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
	phoneno BIGINT REFERENCES users(phone),
	cart JSONB
);
```
add a .env file in `/backend` which should contain the folling data:
```
MONGO_URL=
PG_USER=""
PG_HOST="localhost"
PG_DATABASE=""
PG_PASSWORD=""
PG_PORT=""
```

In terminal:
```
cd backend/
```
then
```
npm i
```
run server using:
```
node index.js
```
Now the backend should be running  

Since MongoDB is flexible and is simple, Menu items are made using MongoDB. MongoDB even makes it easier to further add item description to these menu items if needed.  

Whereas, postreSQL being relational is always a better way to store user information. This also makes becomes handy when user sessions are implemented i.e helps querying order info/history of that user easy.  

**List of API endpoints:**  
GET:  
"http://localhost:8080/menu"  
"http://localhost:8080/cart"  
"http://localhost:8080/orders"  

POST:  
"http://localhost:8080/cart"  
"http://localhost:8080/checkout"
