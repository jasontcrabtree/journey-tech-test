export const currencyRates = [
  {
    currency: 'NZD',
    rate: 1,
  },
  {
    currency: 'USD',
    rate: 0.76,
  },
  {
    currency: 'EURO',
    rate: 0.67,
  },
];

export const calculateExchangeRate = (currency: string | number): number => {
  return (
    currencyRates.find(
      (rate: { currency: string }) => rate.currency === currency
    )?.rate || 0
  );
};
