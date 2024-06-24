import { NextRequest, NextResponse } from 'next/server';
import { CustomRequest } from './auth';

export const applyMiddleware = async (
  req: CustomRequest,
  handler: (req: CustomRequest) => Promise<NextResponse>,
  middlewares: Array<(req: CustomRequest) => Promise<void | NextResponse>>
): Promise<NextResponse> => {
  for (const middleware of middlewares) {
    const result = await middleware(req);
    if (result) {
      return result;
    }
  }
  return handler(req);
};
