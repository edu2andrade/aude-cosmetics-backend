import Username from '@/domain/Username';

describe('Username', () => {
    test('Should throw an error if username is less than 3 characters', () => {
        const input = 'us';

        expect(() => new Username(input)).toThrow('Invalid username');
    });

    test('Should throw an error if username is more than 16 characters', () => {
        const input = 'username1234567890';

        expect(() => new Username(input)).toThrow('Invalid username');
    });

    test('Should throw an error if username contains invalid characters', () => {
        const input = 'username!';

        expect(() => new Username(input)).toThrow('Invalid username');
    });

    test('Should create a valid username', () => {
        const input = 'username';

        expect(() => new Username(input)).not.toThrow('Invalid username');
    });
});
