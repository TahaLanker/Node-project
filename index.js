const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const authtenticate = require("./middlewares/auth");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const config = require("./config");

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App listening in port: ${port}`));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/grocers_yard")
//   .then(() => {
//     console.log("connected to db");
//   })
//.catch((err) => console.log(err));
async function connect() {
//  await mongoose.connect("mongodb://127.0.0.1:27017/grocers_yard");
  await mongoose.connect(config.conStr);
  console.log("connected to db");
}
connect();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/", homeRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoriesRouter);
app.use(authtenticate.tokenAuth);
