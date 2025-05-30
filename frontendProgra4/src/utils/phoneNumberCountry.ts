export const formatPhoneNumber = (phone: string) => {
  if (!phone.startsWith('+')) {
    return `+${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
  }
  return phone;
};

