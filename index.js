import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./src/config/db.js";
import { router } from "./src/routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user",router)

app.get("/",(req , res) =>{
    res.send("app is runing sucesfuly")
})

dbconnect();

const port = console.log.PORT || 8000;

app.listen(port, () => {
    console.log(`app runing on port no ${port}`)
})