const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


export const maxAge = 3*24*60*60*1000;
export async function encryptPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export function generateToken(userId: string, username: string){
    return jwt.sign({userId, username}, process.env.JWT_PASSWORD, {expiresIn: maxAge});
}

export function checkPassword(password: string, hashedPassword: string){
    const validPassword = bcrypt.compareSync(password, hashedPassword);
    return validPassword;
}