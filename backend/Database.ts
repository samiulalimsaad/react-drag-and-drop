import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextConnect } from "next-connect";

const connectDB =
    (handler: NextConnect<NextApiRequest, NextApiResponse<any>>) =>
    (req: NextApiRequest, res: NextApiResponse) => {
        console.log("database triggered");
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        mongoose.connect(process.env.DATABASE_URL as string);
        return handler(req, res);
    };

export default connectDB;
