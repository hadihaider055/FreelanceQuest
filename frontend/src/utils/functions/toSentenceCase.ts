export const convertToSentenceCase = (inputString: string) => {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return "";
  }

  const words = inputString.toLowerCase().split(" ");

  const sentenceCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const sentenceCaseString = sentenceCaseWords.join(" ");

  return (
    sentenceCaseString.charAt(0).toUpperCase() + sentenceCaseString.slice(1)
  );
};
