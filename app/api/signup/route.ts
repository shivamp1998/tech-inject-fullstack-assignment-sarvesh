'use server'
import type {  NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import dbConnect from "../libs/mongodb";
import User from '../models/User'
import { encryptPassword } from '../services/password'
import { generateToken } from '../libs/jwt';
import { serialize } from 'cookie'; 


export async function POST(req: NextRequest) {
    try {
        await dbConnect();    
        const body = await req.json();
        const { name, email, password } = body;
        let user = await User.findOne({ email });
        
        if (user) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        const hashedPass = encryptPassword(password);
        user = await User.create({
            name,
            email,
            password: hashedPass
        });
        const token = generateToken(user.id, email);

        const cookie = serialize('token', token, {
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        delete user.password;
        const response =  NextResponse.json({ working: 'fine', user, token }, { status: 201 });
        response.headers.set('Set-Cookie', cookie);
        return response;
    } catch (err: any) {
        return NextResponse.json({ message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
}