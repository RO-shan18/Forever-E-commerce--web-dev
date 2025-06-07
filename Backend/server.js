import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//user/admin api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

//connect cloudinary
connectcloudinary()
  .then(() => console.log("Cloudinary connect successfully"))
  .catch(() => console.log("cloudinary not connected"));
//connect databases
connectDB()
  .then(() => {
    console.log("Database connected successfully");

    //listening
    app.listen(port, () => {
      console.log("App Listening to the Port no: ", port);
    });
  })
  .catch(() => {
    console.log("Database not connected");
  });
