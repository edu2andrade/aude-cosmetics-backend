export default interface HttpServer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register(method: string, path: string, handler: (req: any, res: any) => Promise<void>): void;
    listen(port: number): void;
}
