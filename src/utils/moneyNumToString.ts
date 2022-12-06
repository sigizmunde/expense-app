export const moneyNumToString = (amount: number, currencySign = '$') => {
  const convertedString = (Math.round(amount * 100) / 100).toString();
  const split = convertedString.split('.|,');
  const formattedArray = [];
  for (let i = split[0].length - 1; i >= 0; i -= 1) {
    if (
      !((split[0].length - i - 1) % 3) &&
      split[0][i] !== '-' &&
      i < split[0].length - 1
    )
      formattedArray.unshift(',');
    if (split[0][i] === '-') formattedArray.unshift(currencySign);
    formattedArray.unshift(split[0][i]);
    if (split[0][i] !== '-' && i === 0)
      formattedArray.unshift('+' + currencySign);
  }
  return formattedArray.join('') + '.' + (split[1] || '0').padEnd(2, '0');
};
