'use server';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import User from '../models/User'
import dbConnect from '../libs/mongodb'
import { comparePassword } from '../services/password'

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({email});
        if(!user) {
            throw new Error('User not found!')
        }
        const isSame = await comparePassword(user.password, password);
        if(isSame) {
            return NextResponse.json({success: true, user})
        }else{
            throw new Error("Passwords do not match!");
        }
    }catch(err: any) {
        return NextResponse.json({success: false, message: err.message});
    }
}