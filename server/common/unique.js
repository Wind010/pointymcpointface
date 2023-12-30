
const HexUpperOnly = "0123456789ABCDEF"
const HEX_MIXEDCASE = '0123456789ABCDEFabcdef';

function randomCharactersFromArray(charactersArray, length) {
    const randomString = Array.from({ length }, () => {
      const randomIndex = Math.floor(Math.random() * charactersArray.length);
      return charactersArray[randomIndex];
    }).join('');
  
    return randomString;
  }
  
  
module.exports = {HexUpperOnly, HEX_MIXEDCASE, randomCharactersFromArray};



