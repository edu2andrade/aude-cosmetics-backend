import Password from '@/domain/Password';

describe('Password', () => {
    test('Should throw an error if password does not have at least 8 characters', () => {
        const input = 'Test@1';

        expect(() => new Password(input)).toThrow(
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
    });

    test('Should throw an error if password does not contain at least one uppercase letter', () => {
        const input = 'test@1234';

        expect(() => new Password(input)).toThrow(
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
    });

    test('Should throw an error if password does not contain at least one lowercase letter', () => {
        const input = 'TEST@1234';

        expect(() => new Password(input)).toThrow(
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
    });

    test('Should throw an error if password does not contain at least one number', () => {
        const input = 'Test@TEST';

        expect(() => new Password(input)).toThrow(
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
    });

    test('Should throw an error if password does not contain at least one special character', () => {
        const input = 'Test1234';

        expect(() => new Password(input)).toThrow(
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
    });
});
