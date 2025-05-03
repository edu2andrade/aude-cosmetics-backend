import DatabaseConnection from '@/infra/database/DatabaseConnection';
import PgPromiseAdapter from '@/infra/database/PgPromiseAdapter';
import AccountRepositoryDatabase from '@/infra/repository/AccountRepositoryDatabase';
import Signup from '@/application/use-case/Signup';
import { Role } from '@/domain/Account';

describe('Signup', () => {
    let databaseConnection: DatabaseConnection;
    let accountRepository: AccountRepositoryDatabase;
    let signup: Signup;

    beforeEach(() => {
        databaseConnection = new PgPromiseAdapter();
        accountRepository = new AccountRepositoryDatabase(databaseConnection);
        signup = new Signup(accountRepository);
    });

    afterEach(async () => {
        const existingAccount = await accountRepository.findByEmail('user@example.com');
        if (existingAccount) await accountRepository.delete(existingAccount.accountId);
        await databaseConnection.close();
    });

    test('should create a new user', async () => {
        const input = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        const output = await signup.execute(input);

        expect(output.accountId).toBeDefined();
        expect(output.role).toBe(Role.CLIENT);
        expect(output.message).toBe('User created successfully');
    });

    test('should throw an error if missing required fields', async () => {
        const input = {
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        // @ts-expect-error missing email
        await expect(signup.execute(input)).rejects.toThrow('Missing required fields');
    });

    test('should throw an error if email is already taken', async () => {
        const input = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        await signup.execute(input);

        const input2 = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        await expect(signup.execute(input2)).rejects.toThrow('Email is already taken');
    });

    test('should throw an error if username already exists', async () => {
        const input = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        await signup.execute(input);

        const input2 = {
            email: 'user2@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@1234',
        };

        await expect(signup.execute(input2)).rejects.toThrow('Username is already taken');
    });

    test('should throw an error if passwords do not match', async () => {
        const input = {
            email: 'user@example.com',
            username: 'user',
            password: 'Test@1234',
            confirmPassword: 'Test@12345',
        };

        await expect(signup.execute(input)).rejects.toThrow('Passwords do not match');
    });
});
