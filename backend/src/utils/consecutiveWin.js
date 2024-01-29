const getConsecutiveWins = (coinTossResults) => {
  let consecutiveWins = 0;
  let currentConsecutive = 0;

  for (let i = coinTossResults.length - 1; i >= 0; i--) {
    if (coinTossResults[i].won) {
      currentConsecutive++;

      if (currentConsecutive > 5) {
        currentConsecutive = 1;
      }

      consecutiveWins = currentConsecutive;
    } else {
      break;
    }
  }

  return consecutiveWins;
};

export default getConsecutiveWins;
