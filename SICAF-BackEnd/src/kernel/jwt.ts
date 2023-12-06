import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response, NextFunction } from 'express'

export const compareEncrypt = async (data: string, dataEncrypt: string): Promise<boolean> => { 
    return await bcryptjs.compare(data, dataEncrypt);
}