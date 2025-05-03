// Port - Interface Adapter
export default interface DatabaseConnection {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query(statement: string, params?: any): Promise<any>;
    close(): Promise<void>;
}
