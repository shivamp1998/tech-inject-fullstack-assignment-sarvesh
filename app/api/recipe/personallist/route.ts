'use server';

import { NextRequest, NextResponse } from 'next/server';
import Recipe from '../../models/Recipe';
import dbConnect from '../../libs/mongodb';
import { auth, CustomRequest } from '../../libs/auth';
import { applyMiddleware } from '../../libs/middleware';

const handleGet = async (req: CustomRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const userId = req.userId;
    const recipes = await Recipe.find({ userId });
    return NextResponse.json({ data: recipes });
  } catch (err) {
    return NextResponse.json({ message: 'Error in fetching recipes' }, { status: 400 });
  }
};


export const GET = async (req: NextRequest): Promise<NextResponse> => {
  return applyMiddleware(req as CustomRequest, handleGet, [auth]);
};

