// Generate sample price data for chart
export const generatePriceData = (basePrice: number, days: number = 30) => {
  const data = [];
  let currentPrice = basePrice;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 10;
    currentPrice = Math.max(50, currentPrice + change);
    data.push({
      day: i + 1,
      price: Number(currentPrice.toFixed(2)),
    });
  }
  return data;
};

