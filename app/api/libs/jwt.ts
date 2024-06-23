import jwt from 'jsonwebtoken'
export const generateToken = (userId: string, email : string) => {
    const payload = {
        userId,
        email
    }
    const secret = process.env.SECRET!;
    return jwt.sign(payload, secret);
}