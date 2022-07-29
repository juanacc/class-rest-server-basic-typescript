import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import db from '../db/connection';

export class Server {
    private app: Application; //no es necesario definir el tipo pero es una buena practica
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.log(error);
            throw new Error('Connection error');
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // BODY PARSER
        this.app.use(express.json());

        //PUBLIC FOLDER
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`)
        })
    }
}

//export default Server;