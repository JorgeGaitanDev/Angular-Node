import { Request, Response } from "express";

export const getCitas = (req: Request, res: Response) => {
    
    res.json({
        msg: "get Citas"
    })
    
    // req.headers
    // req.body

    // res.json
    // res.status // typado
}