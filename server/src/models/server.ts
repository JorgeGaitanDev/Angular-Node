import express, { Application } from "express";
import routesCitas from "../routes/citas";
import routesUser from "../routes/user";

class Server {
    private app: Application;
    private port: string; // puerto con el que vamos a correr la aplicaion

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.midlewares();
        this.routes();
       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Hello world " + this.port);
        })
    }

    routes() {
        this.app.use("/api/citas", routesCitas);
        this.app.use("/api/users", routesUser);
    }

    midlewares() {
        this.app.use(express.json());
    }
}

export default Server;