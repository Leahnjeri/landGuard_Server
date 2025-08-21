
// function to sign up a new user
import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { AppDataSource } from "../config/data-source";
import { User } from "../Entities/User";
import bcrypt from "bcryptjs";



export const signUp = asyncHandler(async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
//  1. destructure the body
const { firstName, lastName, email, phoneNumber, nationalId, password, roleId } = req.body;

// check if email or nationalId already exists in database
const emailcheck = await userRepository.findOne({
    where:{email}
})

if(emailcheck){
    return res.status(400).json({ message: "Email already exists" });
}

const nationalIdCheck = await userRepository.findOne({
    where: { nationalId: nationalId }
})

if(nationalIdCheck){
    return res.status(400).json({ message: "National ID already exists" });
}

// 2. Hash a password
const hashedPassword = await bcrypt.hash(password , await bcrypt.genSalt(10))

// 3. create a new user
const newUser = userRepository.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    nationalId,
    password: hashedPassword,
    role: {
        role_id: roleId
    }
});

// 4. save the user to the database
await userRepository.save(newUser);
// 5. send a response
res.status(201).json({
    message: "User created successfully",
    user: {
        userId: newUser.user_id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        nationalId: newUser.nationalId,
        role: {
            roleId: newUser.role.role_id,
            roleName: newUser.role.roleName
        }}
    });
});

