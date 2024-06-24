import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends NextRequest {
  userId?: string;
}

export const auth = async (req: CustomRequest) => {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Authentication token is missing' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    req.userId = decoded.userId;
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
};
