import crypto from 'node:crypto';

export default class Password {
    private hashed: string;

    constructor(readonly value: string) {
        if (!this.validatePassword(value)) {
            throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }
        this.hashed = this.hashPassword(value);
    }

    validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    hashPassword = (password: string) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    };

    getHashedValue = () => this.hashed;
}
