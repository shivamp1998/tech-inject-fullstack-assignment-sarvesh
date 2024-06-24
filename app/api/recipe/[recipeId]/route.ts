import { NextRequest, NextResponse } from 'next/server';
import Recipe from '../../models/Recipe';
import dbConnect from '../../libs/mongodb';
import { auth, CustomRequest } from '../../libs/auth';
import { applyMiddleware } from '../../libs/middleware';

const handleDelete = async (req: CustomRequest): Promise<NextResponse> => {
    try {
      await dbConnect();
      const recipeId = req.nextUrl.pathname.split('/').pop();
      const userId = req.userId;
      const recipe = await Recipe.findOneAndDelete({ _id: recipeId});
  
      if (!recipe) {
        return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      return NextResponse.json({ message: 'Error in deleting recipe' }, { status: 400 });
    }
};

const handleEdit = async (req: CustomRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const recipeId = req.nextUrl.pathname.split('/').pop();
    const { name, category, ingredients, instructions, image } = await req.json();
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId},
      { name, category, ingredients, instructions, image },
      { new: true }
    );


    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Recipe updated successfully', data: recipe });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error in updating recipe' }, { status: 400 });
  }
};


export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    return applyMiddleware(req as CustomRequest, handleDelete, [auth]);
};

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  return applyMiddleware(req as CustomRequest, handleEdit, [auth]);
};
  
  