export function capitalizedWords(str: string | null | undefined): string {
  if (!str) {
    return "";
  }

  const words = str.split("/(?=[A-Z])/)");

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(" ");
}

export function splitStringByCapital(inputString: string): string {
    inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1) // Capitalize the first letter
  const capitalizedWords = inputString.split(/(?=[A-Z])/);
  return capitalizedWords.join(" ");
}