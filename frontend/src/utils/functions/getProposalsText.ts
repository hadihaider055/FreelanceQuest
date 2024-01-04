export const getProposalsText = (proposals: number) => {
  if (proposals < 5) {
    return "Less than 5";
  } else if (proposals >= 5 && proposals < 10) {
    return "5 to 10";
  } else if (proposals >= 10 && proposals < 20) {
    return "10 to 20";
  } else if (proposals >= 20 && proposals < 50) {
    return "20 to 50";
  } else {
    return "50+";
  }
};
