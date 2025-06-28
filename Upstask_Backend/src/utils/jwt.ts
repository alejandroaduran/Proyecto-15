import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

type UserPayLoad = {
    id: ObjectId;
}

export const generateJWT = (payload: UserPayLoad) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "180d",
    })
    //console.log("JWT generated:", token);
    return token;
};