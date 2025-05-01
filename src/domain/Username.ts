export default class Username {
    constructor(readonly value: string) {
        if (!this.validateUsername(value)) throw new Error('Invalid username');
    }

    validateUsername = (username: string) => {
        // - must contain only letters (a-z or A-Z), numbers (0-9) or underscores (_)
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
        return usernameRegex.test(username);
    };
}
