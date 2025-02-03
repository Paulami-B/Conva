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
exports.googleSignin = exports.signin = exports.signup = void 0;
const db_1 = require("../utils/db");
const encryption_1 = require("../utils/encryption");
const bcrypt = require("bcryptjs");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, profileImage } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        const existingUser = yield db_1.prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hashedPassword = yield (0, encryption_1.encryptPassword)(password);
        const username = name.toLowerCase().split(' ')[0] + Math.round(Math.random() * 10000);
        const newUser = yield db_1.prismaClient.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                profileImage: profileImage ? profileImage : `https://avatar.iran.liara.run/public/${Math.ceil(Math.random() * 100)}`
            },
            select: {
                id: true,
                username: true
            }
        });
        res.cookie("access_token", (0, encryption_1.generateToken)(newUser.id, newUser.username), {
            maxAge: encryption_1.maxAge,
            secure: true,
            sameSite: "none",
        });
        return res.status(201).send({
            userId: newUser.id,
            username: newUser.username
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }
        const user = yield db_1.prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (!(0, encryption_1.checkPassword)(password, user.password)) {
            return res.status(400).send("Incorrect password");
        }
        res.cookie('access_token', (0, encryption_1.generateToken)(user.id, user.username)), {
            maxAge: encryption_1.maxAge,
            secure: true,
            sameSite: 'none'
        };
        return res.status(200).send({
            userId: user.id,
            username: user.username
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});
exports.signin = signin;
const googleSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, profileImage } = req.body;
    try {
        const existingUser = yield db_1.prismaClient.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            res.cookie('access_token', (0, encryption_1.generateToken)(existingUser.id, existingUser.username)), {
                maxAge: encryption_1.maxAge,
                secure: true,
                sameSite: 'none'
            };
            return res.status(200).send({
                userId: existingUser.id,
                username: existingUser.username
            });
        }
        const username = name.toLowerCase().split(' ')[0] + Math.round(Math.random() * 10000);
        const hashedPassword = yield (0, encryption_1.encryptPassword)(Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8));
        const newUser = yield db_1.prismaClient.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                profileImage,
                username
            },
            select: {
                id: true,
                username: true
            }
        });
        res.cookie('access_token', (0, encryption_1.generateToken)(newUser.id, newUser.username), {
            maxAge: encryption_1.maxAge,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).send({
            userId: newUser.id,
            username: newUser.username
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});
exports.googleSignin = googleSignin;
