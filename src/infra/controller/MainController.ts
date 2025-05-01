import express from 'express';
import Signup from '@/application/use-case/Signup';
import HttpServer from '@/infra/http/HttpServer';

export default class MainController {
    basePath = '/api/v1';

    constructor(
        private httpServer: HttpServer,
        signup: Signup
    ) {
        this.httpServer.register('get', `${this.basePath}/healthcheck`, async (req: express.Request, res: express.Response) => {
            res.status(200).json({ status: 'ok' });
        });
        this.httpServer.register('post', `${this.basePath}/signup`, async (req: express.Request, res: express.Response) => {
            const { username, email, password, confirmPassword } = req.body;
            const output = await signup.execute({ username, email, password, confirmPassword });
            res.status(201).json(output);
        });
    }
}
