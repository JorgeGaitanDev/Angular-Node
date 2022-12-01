"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const citas_1 = __importDefault(require("../routes/citas"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Hello world " + this.port);
        });
    }
    routes() {
        this.app.use("/api/citas", citas_1.default);
        this.app.use("/api/users", user_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
