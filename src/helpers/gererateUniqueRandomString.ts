const usedStrings = new Set();

const generateRandomChars = (length: number, characters: string) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateUniqueRandomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // Generate a random string
  result = generateRandomChars(length, characters);

  // Check if the generated string is already used, if so, generate a new one
  while (usedStrings.has(result)) {
    result = generateRandomChars(length, characters);
  }

  // Add the generated string to the set of used strings
  usedStrings.add(result);

  return result;
};

export default generateUniqueRandomString;
