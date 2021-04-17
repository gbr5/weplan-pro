export const trimCardName = (cardName: string): string => {
  const trimmedName = cardName
    .normalize('NFD')
    .toLowerCase()
    .replace(/ /g, '-');

  return trimmedName;
};
