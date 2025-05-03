import Account, { Role } from '@/domain/Account';

describe('Account', () => {
    test('Should create a new account', () => {
        const account = Account.create('username', 'user@example.com', 'Test@1234');

        expect(account.accountId).toBeDefined();
        expect(account.username.value).toBe('username');
        expect(account.email.value).toBe('user@example.com');
        expect(account.hashedPassword).toBeDefined();
        expect(account.role).toBe(Role.CLIENT);
    });
});
