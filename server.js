const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors())
app.use(fileUpload());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// database connetion
const connectDB = require("./src/connection/DBConnect");
connectDB()

// route
const userRoutes = require("./src/modules/user/user.route");
const productRoutes = require("./src/modules/foods/product.routes");

app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
  res.send('Hello Food Mart Server is connected 1!')
})

app.listen(port, () => {
  console.log(`Food Mart listening on port ${port}`)
})

