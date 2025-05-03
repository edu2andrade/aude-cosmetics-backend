import AccountRepository from '@/application/repository/AccountRepository';
import Account, { Role } from '@/domain/Account';

export default class SignUp {
    constructor(private readonly accountRepository: AccountRepository) {}

    async execute(input: Input): Promise<Output> {
        if (!input.email || !input.password || !input.confirmPassword) throw new Error('Missing required fields');
        if (input.password !== input.confirmPassword) throw new Error('Passwords do not match');
        const existingEmail = await this.accountRepository.findByEmail(input.email);
        if (existingEmail) throw new Error('Email is already taken');
        const existingUsername = await this.accountRepository.findByUsername(input.username);
        if (existingUsername) throw new Error('Username is already taken');

        const account = Account.create(input.username, input.email, input.password);
        await this.accountRepository.save(account);

        return {
            accountId: account.accountId,
            role: account.role!,
            message: 'User created successfully',
        };
    }
}

type Input = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type Output = {
    accountId: string;
    message: string;
    role: Role;
};
