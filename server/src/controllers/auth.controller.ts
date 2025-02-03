import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../utils/db";
import { checkPassword, encryptPassword, generateToken, maxAge } from "../utils/encryption";

export const signup = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, password, profileImage} = req.body;
        if(!name || !email || !password){
            return res.status(400).send("All fields are required");
        }
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if(existingUser){
            return res.status(400).send("User already exists");
        }
        const hashedPassword = await encryptPassword(password);
        const username = name.toLowerCase().split(' ')[0]+Math.round(Math.random()*10000);
        const newUser = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                profileImage: profileImage ? profileImage : `https://avatar.iran.liara.run/public/${Math.ceil(Math.random()*100)}`
            },
            select: {
                id: true,
                username: true
            }
        });
        res.cookie("access_token", generateToken(newUser.id, newUser.username), {
            maxAge: maxAge,
            secure: true,
            sameSite: "none",
        })
        return res.status(201).send({
            userId: newUser.id,
            username: newUser.username
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const signin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if(!user){
            return res.status(404).json("User not found");
        }
        if(!checkPassword(password, user.password)){
            return res.status(400).send("Incorrect password");
        }
        res.cookie('access_token', generateToken(user.id, user.username)), {
            maxAge: maxAge,
            secure: true,
            sameSite: 'none'
        }
        return res.status(200).send({
            userId: user.id,
            username: user.username
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const googleSignin = async(req: Request, res: Response, next: NextFunction) => {
    const {name, email, profileImage} = req.body;
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email
            }
        });
        if(existingUser){
            res.cookie('access_token', generateToken(existingUser.id, existingUser.username)), {
                maxAge: maxAge,
                secure: true,
                sameSite: 'none'
            }
            return res.status(200).send({
                userId: existingUser.id,
                username: existingUser.username
            });
        }
        const username = name.toLowerCase().split(' ')[0]+Math.round(Math.random()*10000);
        const hashedPassword = await encryptPassword(Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8));
        const newUser = await prismaClient.user.create({
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
        res.cookie('access_token', generateToken(newUser.id, newUser.username), {
            maxAge: maxAge,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).send({
            userId: newUser.id,
            username: newUser.username
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}