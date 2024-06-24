'use server';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import User from '../models/User'
import dbConnect from '../libs/mongodb'
import { comparePassword } from '../services/password'
import { serialize } from 'cookie'; 
import { generateToken } from '../libs/jwt';


export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({email});

        if(!user) {
            throw new Error('User not found!')
        }

        const isSame = await comparePassword(password, user.password);
        const token = generateToken(user.id, email);

        const cookie = serialize('token', token, {
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        if(isSame) {
            const response =  NextResponse.json({success: true, user});
            response.headers.set('Set-Cookie', cookie);
            return response;
        }else{
            throw new Error("Passwords do not match!");
        }
    }catch(err: any) {
        return NextResponse.json({success: false, message: err.message}, {status: 500});
    }
}