import Account from '@/domain/Account';

export default interface AccountRepository {
    save(account: Account): Promise<void>;
    delete(accountId: string): Promise<void>;
    findByEmail(email: string): Promise<Account | undefined>;
    findByUsername(username: string): Promise<Account | undefined>;
}
