import express from 'express'
import cors from 'cors'

import candidatesRoute from './src/routes/candidatesRoute'

const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors())

app.use("/candidates", candidatesRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})