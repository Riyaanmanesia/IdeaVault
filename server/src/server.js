import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

//middleware

app.use(express.json()); //this will parse json bodies
app.use(rateLimiter);

//simple custom middleware
// app.use((req,res,next)=>{
//    console.log(`request method is ${req.method} & Req url is ${req.url}`);
//    next();

// })

app.use("/api/notes", notesRoutes);


//We serve the react application using the same backend port 
//if it is in the production
//if visit any other url than api serve react app

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started on Port:", PORT);
  });
});

// tNtThBIudG9gii9N
