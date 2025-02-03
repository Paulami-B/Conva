"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./utils/db");
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
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt a simple query to verify connection
            yield db_1.prismaClient.$queryRaw `SELECT 1`;
            console.log('Connected to the database successfully.');
        }
        catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    });
}
checkConnection();
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
});
