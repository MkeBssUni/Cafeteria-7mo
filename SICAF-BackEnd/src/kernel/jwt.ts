import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response, NextFunction } from 'express'

export const compareEncrypt = async (data: string, dataEncrypt: string): Promise<boolean> => { 
    return await bcryptjs.compare(data, dataEncrypt);
}

export const generateRandomString = (): string => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYZ1234567890';
    for (let i = 0; i < 15; i++)
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    return result;
}

export const encodeString = async (data: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(data, salt);
}

export const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.SECRET_KEY || 'secret');
}