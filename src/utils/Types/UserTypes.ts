import { Request } from "express";


export interface User{
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nationalId: string;
    password: string;
    role:{
        roleId: number;
        roleName: string;
    }
}

export interface UserRequest extends Request {
    user?:User
}