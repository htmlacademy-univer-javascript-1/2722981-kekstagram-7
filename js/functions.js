function checkLengthString(string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome(string) {
  const normalizedStr = string.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }
  return normalizedStr === reversedStr;
}

function returnNumber(string) {
  const newStr = string.toString();
  let result = '';
  for (let i = 0; i < newStr.length; i++) {
    const char = newStr[i];
    const parsedChar = parseInt(char, 10);
    if (!Number.isNaN(parsedChar)) {
      result += char;
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
}

// Проверка функций
checkLengthString('проверка', 10);
checkPalindrome('Проверка');
returnNumber('2026 год');
