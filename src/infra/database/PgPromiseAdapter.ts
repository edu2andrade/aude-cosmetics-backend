import DatabaseConnection from '@/infra/database/DatabaseConnection';
import pgp from 'pg-promise';

// Framework and Driver / Library
export default class PgPromiseAdapter implements DatabaseConnection {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connection: any;

    constructor() {
        this.connection = pgp()(process.env.DATABASE_URL!);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async query(statement: string, params?: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }
}
