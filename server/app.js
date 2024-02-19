require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn")
const cors = require("cors");
const router = require("./Routes/router");
const PORT = 6010

// it's used to enable Cross-Origin Resource Sharing (CORS) for your server.
// when you're building a web application with a frontend and backend 
// hosted on different domains, you need to enable CORS to allow the 
// frontend to make requests to the backend.
app.use(cors());

// It simplifies the process of handling JSON data sent from clients 
// to the server.

// using app.use() mount middleware function express application
app.use(express.json());
app.use(router);

app.use("/uploads", express.static("./uploads"));

app.listen(PORT, () => {
    console.log(`Server start at port no ${PORT}`)
})

// Express.js provides a convenient way to handle various types of 
// HTTP requests (GET, POST, PUT, DELETE, etc.).


// Node.js serves as the backend server for your application
// Node.js is where you implement the business logic of your application
// Node.js communicates with the MongoDB database to store and retrieve data.