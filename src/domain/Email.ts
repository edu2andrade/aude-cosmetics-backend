export default class Email {
    constructor(readonly value: string) {
        if (!this.validateEmail(value)) throw new Error('Invalid email');
    }

    validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
}
