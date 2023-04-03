const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const { errorHandler } = require("./middleware/errorMidlleware");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", require("./routes/productRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/users", require("./routes/userRoutes"));
//DB Connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successed ");
  } catch (error) {
    console.log("something went wrong" + error);
    process.exit(1);
  }
};

connectDB();

//Promise way
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected Successfully"))
//   .catch((err) => console.error("Not Connected" + err));

app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is listening to PORT ${port}`);
});
