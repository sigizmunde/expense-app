const formatShortNum = ({
  amount,
  currencySign = '$',
}: {
  amount: number;
  currencySign?: string;
}) => {
  const convertedString = (Math.round(amount * 100) / 100).toString();
  const split = convertedString.split('.' || ',');
  const formattedArray = [];
  for (let i = split[0].length - 1; i >= 0; i -= 1) {
    if (
      !((split[0].length - i - 1) % 3) &&
      split[0][i] !== '-' &&
      i < split[0].length - 1
    ) {
      formattedArray.unshift(',');
    }
    if (split[0][i] === '-') {
      formattedArray.unshift(`${currencySign} `);
    }
    formattedArray.unshift(split[0][i]);
    if (split[0][i] !== '-' && i === 0) {
      formattedArray.unshift(`+${currencySign} `);
    }
  }
  return `${formattedArray.join('')}.${(split[1] || '0').padEnd(2, '0')}`;
};

const formatLongNum = ({
  amount,
  currencySign = '$',
}: {
  amount: number;
  currencySign?: string;
}) => {
  const absAmount = Math.abs(amount);
  const billions = Math.floor(absAmount / 1000000000);
  const millions = Math.floor((absAmount % 1000000000) / 1000000);
  const thousands = Math.round((absAmount % 1000000) / 1000);
  const sign = amount < 0 ? '-' : '';
  const b = billions ? ` ${billions}B` : '';
  const m = millions ? ` ${millions + Number(billions > 0)}M` : '';
  const k = !billions && thousands ? ` ${thousands}k` : '';
  return sign + currencySign + b + m + k;
};

export const moneyNumToString = ({
  amount,
  currencySign = '$',
  negative = false,
}: {
  amount: number;
  currencySign?: string;
  negative?: boolean;
}) => {
  if (amount === 0 && negative) return `-${currencySign} 0.00`;
  switch (true) {
    case Math.abs(amount) > 9999:
      return formatLongNum({ amount, currencySign });
    default:
      return formatShortNum({ amount, currencySign });
  }
};
