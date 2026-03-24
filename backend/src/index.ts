import express from 'express';
import cors from 'cors'; // <--- Check this
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Your new test route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the Backend I am a fool!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));