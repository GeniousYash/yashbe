// const dotenv = require("dotenv").config();
// const connection = require("./config/db"); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://singhyash3012:yash987@coderyash.a71c9bt.mongodb.net/FULLSTACKAPP?retryWrites=true&w=majority&appName=coderyash");

const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;


app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/note",noteRouter);

app.get("/", (req, res) => {
     res.send("Hello World");
});

app.listen(PORT, async() => {
     try {
          await connection;
          console.log(`Server is running on Port ${PORT} & db is also connected`);
     } catch (error) {
          console.log(error);
     }
});
