import bcrypt from 'bcryptjs';

export const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, encodedPassword) => {
    return bcrypt.compare(password, encodedPassword);
}