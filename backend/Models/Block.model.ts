import mongoose, { Model, models } from "mongoose";
import { blockInterface } from "../utils/Block.Interface";
const { model, Schema } = mongoose;

const BlockModelSchema = new Schema<blockInterface>(
    {
        color: String,
        title: String,
        value: String,
    },
    { timestamps: true }
);

export const BlockModal: Model<blockInterface> =
    models.Block || model("Block", BlockModelSchema);
