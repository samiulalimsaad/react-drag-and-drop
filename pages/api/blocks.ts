import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../backend/Database";
import { BlockModal } from "../../backend/Models/Block.model";
import { onError, onNoMatch } from "../../backend/utils/erors";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: onError,
    onNoMatch: onNoMatch,
})
    .get(async (req, res) => {
        try {
            const blocks = await BlockModal.find({});
            res.json({ blocks });
        } catch (error) {
            res.send(error);
        }
    })
    .post(async (req, res) => {
        try {
            res.status(200).json({ message: "Inserted", success: true });
        } catch (error) {
            res.send(error);
        }
    });

export default connectDB(handler);
