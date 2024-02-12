import express from 'express'
import cors from 'cors'

import candidatesRoute from './src/routes/candidatesRoute'
import usersRoute from "./src/routes/userRoute";

const app = express();
 
require("dotenv/config");
require("google-auth-library");

const port = process.env.PORT

app.use(express.json());
app.use(cors())

app.use("/candidates", candidatesRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})