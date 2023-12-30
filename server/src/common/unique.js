
const HexUpperOnly = "0123456789ABCDEF"
const HEX_MIXEDCASE = '0123456789ABCDEFabcdef';

/**
 * Create a random string of passed in length and character set.
 * @param {string} - The character set to use.
 * @param {int} - The length of ID.
 * @returns {string} - The length of ID.
 */
function generateRandomId(charactersArray, length) {
    const randomString = Array.from({ length }, () => {
      const randomIndex = Math.floor(Math.random() * charactersArray.length);
      return charactersArray[randomIndex];
    }).join('');
  
    return randomString;
  }
  
  
module.exports = {HexUpperOnly, HEX_MIXEDCASE, generateRandomId};


