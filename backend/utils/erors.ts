import { NextApiRequest, NextApiResponse } from "next";

export const onError = (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse
) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
};

export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
};
