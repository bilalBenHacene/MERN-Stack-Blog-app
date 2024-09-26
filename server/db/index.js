import mongoose from "mongoose";
import 'dotenv/config'
const username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;

mongoose.set("strictQuery", false);
mongoose
  .connect(`mongodb+srv://${username}:${password}@cluster0.cmitq.mongodb.net/`)
  .then(() => console.log("connection successfully"))
  .catch((e) => console.log(e.message));
