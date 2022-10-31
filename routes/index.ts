import { Router, Request, Response } from "express";
import mainOcaMethods from "./decodeXML";
const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
    const a = await mainOcaMethods();
    // console.log(a);
    // res.send(a);
    res.send(a);
});

export default routes;