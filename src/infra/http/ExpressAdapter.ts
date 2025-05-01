import HttpServer from './HttpServer';
import express from 'express';
import cors from 'cors';

export default class ExpressAdapter implements HttpServer {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
    }

    register(method: string, path: string, handler: (req: express.Request, res: express.Response) => Promise<void>): void {
        this.app[method as keyof express.Application](path, async (req: express.Request, res: express.Response) => {
            try {
                const output = await handler(req, res);
                res.status(200).json(output);
            } catch (error: unknown) {
                res.status(422).json({ error: error instanceof Error ? error.message : 'Unknown error' });
            }
        });
    }
    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
