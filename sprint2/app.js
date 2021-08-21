const express = require("express");
const path = require("path");
const home = require("./routes/home");
const cart = require("./routes/cart");
const user = require("./routes/user");
const product = require("./routes/product");
const app = express();

app.use(express.static("public"));

app.use("/", home);
app.use("/", cart);
app.use("/", user);
app.use("/", product);



const port = 3030;



app.listen(port, ()=>console.log("Server listening at http://localhost:" + port));

