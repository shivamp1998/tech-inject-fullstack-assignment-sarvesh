'use server'
import type {  NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import dbConnect from "../libs/mongodb";
import User from '../models/User'
import { encryptPassword } from '../services/password'

export async function POST(req: NextRequest) {
    try {
        await dbConnect();    
        const body = await req.json()
        const { name, email, password } = body;
        let user = await User.findOne({email})
        if(user) {
            throw new Error("User already exists!")
        }
        const hashedPass = encryptPassword(password);
        user = await User.create({
            name,
            email,
            password: hashedPass
        })

        return NextResponse.json({working: 'fine', user})
    }catch(err) {
        console.log(err);
        return NextResponse.json({err: err})
    }
}

