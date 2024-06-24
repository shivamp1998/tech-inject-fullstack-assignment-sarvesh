'use server';

import { NextRequest, NextResponse } from 'next/server';
import Recipe from '../../models/Recipe';
import dbConnect from '../../libs/mongodb';
import { auth, CustomRequest } from '../../libs/auth';
import { applyMiddleware } from '../../libs/middleware';

const handlePOST = async (req: CustomRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, category, ingredients, instructions, image } = body;

    if (!name || !category || !ingredients || !instructions || !image) {
      throw new Error('All fields are required');
    }

    const recipe = new Recipe({
      name,
      category,
      ingredients,
      instructions,
      image,
      userId: req.userId, // Attach userId from middleware
    });

    await recipe.save();

    return NextResponse.json({ success: true, data: recipe }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  return applyMiddleware(req as CustomRequest, handlePOST, [auth]);
};
