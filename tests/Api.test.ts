import AccountRepositoryDatabase from '@/infra/repository/AccountRepositoryDatabase';
import { Role } from '@/domain/Account';

describe('Signup', () => {
    const accountRepository = new AccountRepositoryDatabase();

    afterEach(async () => {
        const existingAccount = await accountRepository.findByEmail('user@example.com');
        if (existingAccount) await accountRepository.delete(existingAccount.accountId);
    });
    test('Should signup a new user', async () => {
        const input = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        const response = await fetch('http://localhost:8888/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        const responseData = await response.json();

        expect(response.status).toBe(201);
        expect(responseData.accountId).toBeDefined();
        expect(responseData.role).toBe(Role.CLIENT);
        expect(responseData.message).toBe('User created successfully');
    });
});

describe('Healthcheck', () => {
    test('Should return 200', async () => {
        const response = await fetch('http://localhost:8888/api/v1/healthcheck');
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.status).toBe('ok');
    });
});
