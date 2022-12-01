import express, { Application } from "express";

class Server {
    private app: Application;
    private port: string; // puerto con el que vamos a correr la aplicaion

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Hello world " + this.port);
        })
    }
}

export default Server;