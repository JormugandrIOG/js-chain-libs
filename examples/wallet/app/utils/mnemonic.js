import { validateMnemonic, mnemonicToSeedSync } from 'bip39';

import wordlist from './wordlist.en';

export const isValidMnemonic = (mnemonicPhrase: string, numberOfWords = 12) => {
  switch (numberOfWords) {
    case 12:
    case 15:
    case 18:
    case 21:
    case 24:
      break;
    default:
      return false;
  }
  return (
    mnemonicPhrase &&
    mnemonicPhrase.split(' ').length === numberOfWords &&
    validateMnemonic(mnemonicPhrase, wordlist)
  );
};

export const createSeedFromMnemonic = (
  mnemonicPhrase: string,
  mnemonicPassword?: string
) => {
  // Warning: This is an example wallet and that is not how seed
  // generation works in Cardano. For a correct implementation please
  // read the following document https://github.com/satoshilabs/slips/blob/master/slip-0023.md
  const password = mnemonicPassword || '';
  const seed = mnemonicToSeedSync(mnemonicPhrase, password);
  return seed;
};
