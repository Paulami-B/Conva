import { prismaClient } from "./utils/db";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

async function checkConnection() {
  try {
    // Attempt a simple query to verify connection
    await prismaClient.$queryRaw`SELECT 1`;
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}
checkConnection();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
})