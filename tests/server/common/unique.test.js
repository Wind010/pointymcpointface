const unique = require('../../../server/common/unique');

describe('randomCharactersFromArray', () => {
    it('Should generate a string of the specified length using upper-case hexadecimal character set', () => {
        const length = 8
        const generatedString = unique.randomCharactersFromArray(unique.HexUpperOnly, length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HexUpperOnly).toContain(char);
        }
    });

    it('Should generate a string of the specified length using lower-case hexadecimal character set', () => {
        const length = 8
        const generatedString = unique.randomCharactersFromArray(unique.HexUpperOnly.toLowerCase(), length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HexUpperOnly.toLowerCase()).toContain(char);
        }
    });

    it('Should generate a string of the specified length using mixed-case hexadecimal character set', () => {
        const length = 8
        const generatedString = unique.randomCharactersFromArray(unique.HEX_MIXEDCASE, length);

        expect(generatedString.length).toBe(length); 

        // Check if all characters in the generated string are from the available characters
        for (const char of generatedString) {
            expect(unique.HEX_MIXEDCASE).toContain(char);
        }
    });


});