import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import jwt from "jsonwebtoken";
import { UserRequest } from "../../utils/Types/UserTypes";
import { AppDataSource } from "../../config/data-source";
import { User } from "../../Entities/User";



export const protect = asyncHandler(
async (req:UserRequest, res:Response, next:NextFunction) => {
    let token = req.cookies["access_token"];
    
    if(!process.env.JWT_SECRET){
        throw new Error('JWT secret is not defined in environment variables');
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    try {
        const userRepository = AppDataSource.getRepository(User)
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string, roleId: number };

        //  find user from decoded token
        const user= await  userRepository.findOne({
            where:{ user_id:Number(decoded.userId) },
            relations: ["role"]
        })

        if(!user){
            res.status(401).json({ message: "Unauthorized, user not found" });
            return;
        }

        // attach user to request object
        req.user = {
            userId: user.user_id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            nationalId: user.nationalId,
            password: user.password,
            role: {
                roleId: user.role.role_id,
                roleName: user.role.roleName
            }
        };

        
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    }
)