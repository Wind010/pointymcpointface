const encoders = require('../../src/common/encoders');

describe('Base58 Encoding', () => {
  it('Should encode a number to Base58', () => {
    const input = 123456;
    const expectedEncodedValue = 'RVu1HWU5';

    const encoded = encoders.base58Encode(input);
    expect(encoded).toBe(expectedEncodedValue);
  });

  it('Should encode a UUID/GUID to Base58', () => {
    const input = 'bdf93d26-3438-4927-b5e9-71ba80a7855b';
    const expectedEncodedValue = 'kLJBmagtbDbr3ehVSrzFVRj1nBf6MmcrZAbWE8Y5jVsxU9S5f';

    const encoded = encoders.base58Encode(input);
    expect(encoded).toBe(expectedEncodedValue);
  });


  it('Should encode a symbols to Base58', () => {
    const input = '!@#$%^&*()?|/\{}[]_+=';
    const expectedEncodedValue = 'TsKsiPWtU3NkTDtazEcWr1LUFPa';

    const encoded = encoders.base58Encode(input);
    expect(encoded).toBe(expectedEncodedValue);
  });
});


describe('Base58 Decoding', () => {
  it('Should decode a Base58 string to string', () => {
    const encodedValue = 'RVu1HWU5';
    const expectedDecodedValue = '123456';

    const decoded = encoders.base58Decode(encodedValue);
    expect(decoded).toBe(expectedDecodedValue);
  });

  it('Should decode a Base58 encoded UUID/GUID to string', () => {
    const encodedValue = 'kLJBmagtbDbr3ehVSrzFVRj1nBf6MmcrZAbWE8Y5jVsxU9S5f';
    const expectedDecodedValue = 'bdf93d26-3438-4927-b5e9-71ba80a7855b';

    const decoded = encoders.base58Decode(encodedValue);
    expect(decoded).toBe(expectedDecodedValue);
  });

  it('Should decode a Base58 encoded symbols to string', () => {
    const encodedValue = 'TsKsiPWtU3NkTDtazEcWr1LUFPa';
    const expectedDecodedValue = '!@#$%^&*()?|/\{}[]_+=';

    const decoded = encoders.base58Decode(encodedValue);
    expect(decoded).toBe(expectedDecodedValue);
  });
});
