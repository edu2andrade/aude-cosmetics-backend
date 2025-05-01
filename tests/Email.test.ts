import Email from '@/domain/Email';

describe('Email', () => {
    test('Should throw an error if email does not have @', () => {
        const input = 'userexample.com';

        expect(() => new Email(input)).toThrow('Invalid email');
    });

    test('Should throw an error if email does not have more than 2 characters after .', () => {
        const input = 'user@example.c';

        expect(() => new Email(input)).toThrow('Invalid email');
    });
});
