import crypto from 'node:crypto';
import Password from '@/domain/Password';
import Email from '@/domain/Email';
import Username from './Username';

// DDD Entity
export default class Account {
    private constructor(
        readonly accountId: string,
        readonly username: string,
        readonly email: string,
        readonly hashedPassword?: string,
        readonly role?: Role
    ) {}

    static create(username: string, email: string, password: string, role: Role = Role.CLIENT) {
        const accountId = crypto.randomUUID();
        return new Account(accountId, new Username(username).value, new Email(email).value, new Password(password).getHashedValue(), role);
    }

    static restore(accountId: string, username: string, email: string, role: Role) {
        return new Account(accountId, new Username(username).value, new Email(email).value, undefined, role);
    }
}

export enum Role {
    CLIENT = 'CLIENT',
    WORKER = 'WORKER',
    ADMIN = 'ADMIN',
}
