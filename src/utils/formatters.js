/**
 * Formats a number to Indian Rupee (INR) currency format
 * e.g., 842600 -> ₹8,42,600
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  
  const str = absAmount.toString();
  let result = '';
  
  if (str.length > 3) {
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  } else {
    result = str;
  }
  
  return (isNegative ? '-₹' : '₹') + result;
}

/**
 * Format in Lakhs representation (e.g. 2500000 -> ₹25 Lakhs)
 */
export function formatInLakhs(amount) {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  }
  return formatINR(amount);
}

/**
 * Format percentage with positive/negative prefix
 */
export function formatPercent(value) {
  if (value === undefined || value === null) return '0%';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}
