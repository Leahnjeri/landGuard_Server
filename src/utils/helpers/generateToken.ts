//  function to generate a token
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {Response } from 'express'

dotenv.config()


export const generateToken = (res: Response , userId:string ,roleId:number) => {

    const jwt_secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!jwt_secret || !refreshSecret) {
        throw new Error('JWT secret or refresh token secret is not defined in environment variables');
    }

    try {
        const accessToken = jwt.sign({userId,roleId}, jwt_secret, { expiresIn: '1d',})
        const refreshToken = jwt.sign({userId,roleId}, refreshSecret, { expiresIn: '7d',})

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day   
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error generating tokens:', error);   
        throw new Error('Failed to generate tokens');
    }
}