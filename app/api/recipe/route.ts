'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Recipe from '../models/Recipe';
import dbConnect from '../libs/mongodb';
import { auth, CustomRequest } from '../libs/auth';
import { applyMiddleware } from '../libs/middleware';

const handleGet = async (req: CustomRequest) : Promise<NextResponse> => {
    try {
        await dbConnect();
        const recipes = await Recipe.find({});
        return NextResponse.json({data: recipes});
    }catch(err) {
        return NextResponse.json({message: 'error in fetching recipes'}, {status: 400})
    }
}


export const GET = async(req: NextRequest): Promise<NextResponse> => {
    return applyMiddleware(req as CustomRequest, handleGet, [auth])
}