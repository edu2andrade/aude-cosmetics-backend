import AccountRepository from '@/application/repository/AccountRepository';
import Account, { Role } from '@/domain/Account';
import { PrismaClient } from '@/infra/database/generated/client';

export default class AccountRepositoryDatabase implements AccountRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(account: Account): Promise<void> {
        // connection query
        await this.prisma.user.create({
            data: {
                id: account.accountId,
                username: account.username,
                email: account.email,
                password: account.hashedPassword!,
                role: account.role,
            },
        });
    }

    async delete(accountId: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: accountId,
            },
        });
    }

    async findByEmail(email: string): Promise<Account | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user ? Account.restore(user.id, user.username, user.email, user.role as Role) : undefined;
    }

    async findByUsername(username: string): Promise<Account | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
        return user ? Account.restore(user.id, user.username, user.email, user.role as Role) : undefined;
    }
}
