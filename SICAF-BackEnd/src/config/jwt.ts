import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

export const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.SECRET as string) as string;
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.SECRET as string) as object;
}

export const decodeToken = (token: string) => {
    return jwt.decode(token) as object;
}

export const authenticator = (req: Request, res: Response, next: NextFunction) => {
    //quita el token del header
    const token = req.headers.authorization?.split(' ')[1];
    //no autoriza si no hay token
    if (!token){
        return res.status(401).json({
            message: 'No autorizado',
            error: true
        });
    }

    //verfica
    try{
        const decoded = verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'No autorizado',
            error: true
        });
    }

    return
}
