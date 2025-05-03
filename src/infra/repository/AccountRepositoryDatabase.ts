import AccountRepository from '@/application/repository/AccountRepository';
import Account from '@/domain/Account';
import DatabaseConnection from '@/infra/database/DatabaseConnection';

export default class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async save(account: Account): Promise<void> {
        // connection query using ORM (if you use one...) or raw SQL
        await this.connection.query(
            `
            INSERT INTO audedb.user (id, username, email, password, role)
            VALUES ($1, $2, $3, $4, $5)
        `,
            [account.accountId, account.username.value, account.email.value, account.hashedPassword, account.role]
        );
    }

    async delete(accountId: string): Promise<void> {
        await this.connection.query(
            `
            DELETE FROM audedb.user
            WHERE id = $1
        `,
            [accountId]
        );
    }

    async findByEmail(email: string): Promise<Account | undefined> {
        const [user] = await this.connection.query(
            `
            SELECT * FROM audedb.user
            WHERE email = $1
        `,
            [email]
        );
        if (!user) return undefined;
        return Account.restore(user.id, user.username, user.email, user.role);
    }

    async findByUsername(username: string): Promise<Account | undefined> {
        const [user] = await this.connection.query(
            `
            SELECT * FROM audedb.user
            WHERE username = $1
        `,
            [username]
        );
        if (!user) return undefined;
        return Account.restore(user.id, user.username, user.email, user.role);
    }
}
