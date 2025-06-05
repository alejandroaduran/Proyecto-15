import bcrypt from "bcrypt"

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return password = await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}