export const formatPhoneNumber = (phone: string) => {
  if (!phone.startsWith('+')) {
    return `+${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
  }
  return phone;
};

export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const countryCodeToFlag = (phone: string) => {
  if (!phone.startsWith('+')) return '';
  const dial = phone.replace('+', '');
  if (dial.startsWith('506')) return getFlagEmoji('CR');
  if (dial.startsWith('52')) return getFlagEmoji('MX');
  if (dial.startsWith('1')) return getFlagEmoji('US');
  return '🌐'; // fallback
};

