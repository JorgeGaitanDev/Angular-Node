Utilizaremos
Node en el back
Angular en el front

Front estructura
- servios http
- spinner para las peticiones http
- interceptores
- auth

Instalamos dos dependerías (dos paquetes)
- bootstrap
- ngx-toastr (mensajes de éxito y error)

Back estructura
- node-express
- typeScript
- sequelize (ORM de nodejs)
- MySQL

Consola (carpeta server)
npm init -y
npm install express (crear nuestra api rest)
npm install bcrypt (encriptar nuestra contraseña)
npm install cors (front para lanzar en un determinado puerto y el back en otro)
npm install dotenv (configurar lo que son las variables de entorno)
npm install jsonwebtoken (paquete para crear el token)
npm install sequelize (DB) https://sequelize.org/docs/v6/getting-started/
npm install mysq12 (workbench)

npm install typescript --save-dev (https://www.typescriptlang.org/download)

npm install nodemon --save-dev (https://www.npmjs.com/package/nodemon)

npx tsc --init (inicializar nuestro proyecto de typescript)

Abrimos carpeta tsconfig.json y descontamos outDir
"outDir": "./dist", (todo el código de typeScript lo coloque dentro de una carpeta distinta)

Creamos una nueva carpeta sec (va a tener toda la información) 

Creamos una carpeta llamada index.ts (código)
const nombre: string = 'Jorge';
console.log(nombre);

En consola ponemos npx tsc (se genera un archicofradía dist con una carpeta llamada index.js)

node dist/index.js (imprime en terminal el resultado)

nodemon dist/index.js (levantamos el servidor el cual esta escuchando la carpeta index)

En una terminal nueva ponemos
npx tsc --watch (ve los cambios de typescript)

Vamos a package.json y es test ponemos en la parte de abajo
"dev": "nodemon dist/index.js" (para ejecutarlo de otra manera)
npm run dev

Hacemos lo mismo pero con el otro comando
"typescript": "tsc --watch" (en ves de npx tsc --watch)

ESTRUCTURA DE CARPETAS************************************************************************
En src creamos las siguientes carpetas
controllers, db, models, routes
Y afuera una llamada .env (para las variables de entorno)

*Carpeta models creamos un archivo llamado server.ts y ponemos (código)

Cuando hacemos una importación por defecto no hace falta que le coloquemos las llaves

Vamos a server.ts e importamos express
Y en una nueva terminal escribimos npm i --save-dev @types/express 
(para que pueda correr ts con express)

NOS CONECTAMOS AL SERVIDOR localhost:3000
*server.ts
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

*index.ts
import dotenv from "dotenv";
import Server from "./models/server";

// configuramos dotenv
dotenv.config();

const server = new Server(); 

*.env
PORT = "3001"

CONFIGURACIONES DE RUTAS********************************************************
Vamos a crear 3 endpoint

1. http://localhost:3001/api/citas/       GET ---> devolver las citas
2. http://localhost:3001/api/user        POST ---> agregamos usuario
3. http://localhost:3001/api/user/login  POST ---> agregamos usuario

Creamos dos arvhivos llamados citas.ts en controllers y routes 
Escribimos
*controllers/citas.ts
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

*routes/citas.ts
import { Router } from "express";
import { getCitas } from "../controllers/citas";

const router = Router();

router.get("/", getCitas)

export default router;

Luego vamos a models/server.ts
*models/server.ts
import express, { Application } from "express";
import routesCitas from "../routes/citas";


class Server {
    private app: Application;
    private port: string; // puerto con el que vamos a correr la aplicaion

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.routes();
       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Hello world " + this.port);
        })
    }

    routes() {
        this.app.use("/api/citas", routesCitas);
    }
}

export default Server;

Instalamos la extensión de chrome json viewer (para que se vea mas detallado la ruta) 

Creamos una carpeta
*controllers/user.ts (para el login y user)
import { Request, Response } from "express";

export const newUser = (req: Request, res: Response) => {
    console.log(req.body);

    res.json({
        msg: "New User",
        body: req.body
    })
}

export const loginUser = (req: Request, res: Response) => {
    console.log(req.body);

    res.json({
        msg: "Login User",
        body: req.body
    })
}

Luego creamos 
*routes/user.ts
import { Router } from "express";
import { loginUser, newUser } from "../controllers/user";

const router = Router();

router.post("/", newUser);
router.post("/login", loginUser)

export default router;

Luego vamos a 
*models/server.ts
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
}

export default Server;

Descargamos postman (https://www.youtube.com/watch?v=1SC0zHCsi8g&ab_channel=ROHITTECH)
Abrimos un nuevo reuquest
Y lo ponemos en POST y ponemos la ruta de users
http://localhost:3001/api/users
Dentro de ese archivo ponemos
{
    "nombre": "Jorge Gaitan",
    "password": "Millos12."
}

Vamos a 
*server.ts
Creamos un nuevo metodo llamado
  midlewares() {
        this.app.use(express.json());
    }

Y lo ponemos en el constructor
        this.midlewares();

Volvemos al archivo 
*controllers/user.ts
import { Request, Response } from "express";

export const newUser = (req: Request, res: Response) => {
    
    const { body } = req; ///////////////////////
    // console.log(req.body);

    res.json({
        msg: "New User",
        body //////////////////////////////
    })
}

export const loginUser = (req: Request, res: Response) => {
    
    const { body } = req; ///////////////////
    // console.log(req.body);

    res.json({
        msg: "Login User",
        body //////////////////////
    })
}

Vamos con el 3 endpoint
En postman agregamos /login a la dirección
http://localhost:3001/api/users/login
Y nos va a mostrar el nuevo mensaje de login user
{
    "nombre": "Daniela Gutierrez",
    "password": "Millos12."
}

CREACION DE MODELOS Y GETCITAS   ***************************************************************
