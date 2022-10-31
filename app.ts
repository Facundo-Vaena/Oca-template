const express = require("express");
const soap = require("soap");
const bodyParser = require("body-parser");
import { Request, Response } from "express";
import routes from "./routes";


//-----------------NODE SERVER-----------------


const app = express();

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(3001, () => {
    console.log("listening at port 3001 !");
    
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello !");
});

app.use("/shipment", [routes]);

