import bcrypt from 'bcryptjs';

export const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, encodedPassword: string) => {
    return bcrypt.compare(password, encodedPassword);
}