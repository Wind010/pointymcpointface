const unique = require('../../src/common/unique');

describe('generateRandomId', () => {
    it('Should generate a string of the specified length using upper-case hexadecimal character set', () => {
        const length = 10
        const generatedString = unique.generateRandomId(unique.HexUpperOnly, length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HexUpperOnly).toContain(char);
        }
    });

    it('Should generate a string of the specified length using lower-case hexadecimal character set', () => {
        const length = 10
        const generatedString = unique.generateRandomId(unique.HexUpperOnly.toLowerCase(), length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HexUpperOnly.toLowerCase()).toContain(char);
        }
    });

    it('Should generate a string of the specified length using mixed-case hexadecimal character set', () => {
        const length = 10
        const generatedString = unique.generateRandomId(unique.HEX_MIXEDCASE, length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HEX_MIXEDCASE).toContain(char);
        }
    });


});