const { v4: uuidv4 } = require('uuid');

function encode(input, charset) {
  const base = BigInt(charset.length);
  let num = BigInt(0);
  input = input.toString();

  for (let i = 0; i < input.length; i++) {
    num = num * BigInt(256) + BigInt(input.charCodeAt(i));
  }

  let encoded = '';
  while (num >= base) {
    const remainder = num % base;
    encoded = charset[Number(remainder)] + encoded;
    num = num / base;
  }

  if (num > 0) {
    encoded = charset[Number(num)] + encoded;
  }

  return encoded;
}

function decode(input, charset) {
  const base = BigInt(charset.length);
  let num = BigInt(0);
  input = input.toString();

  for (let i = 0; i < input.length; i++) {
    const charIndex = charset.indexOf(input[i]);
    if (charIndex === -1) throw new Error('Invalid character in encoded string');
    num = num * base + BigInt(charIndex);
  }

  let decoded = '';
  while (num > 0) {
    const remainder = num % BigInt(256);
    decoded = String.fromCharCode(Number(remainder)) + decoded;
    num = num / BigInt(256);
  }

  return decoded;
}

// No 0, O, I, l
const Base58Charset = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';


function base58Encode(input) {
  return encode(input, Base58Charset)
}

function base58Decode(input) {
  return decode(input, Base58Charset)
}



module.exports = {base58Encode, base58Decode};



