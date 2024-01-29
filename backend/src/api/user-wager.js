import User from "../models/user.js";
import getConsecutiveWins from "../utils/consecutiveWin.js";

const wager = async (req, res) => {
  const { tokens, wager } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId, tokens: { $gte: tokens } },
      { $inc: { tokens: -tokens } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "Not enough tokens" });
    }

    const coinFlipResult = Math.random() >= 0.5 ? "heads" : "tails";

    const isWon = coinFlipResult === wager;

    const updatedCoinFlipResult = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $push: {
          coinTossResults: {
            outcome: coinFlipResult,
            won: isWon,
          },
        },
      },
      { new: true }
    );

    if (isWon) {
      let payoutMultiplier = 2;
      let isBonusPayout = false;

      const consecutiveWins = getConsecutiveWins(
        updatedCoinFlipResult.coinTossResults
      );

      if (consecutiveWins === 3) {
        payoutMultiplier = 3;
        isBonusPayout = true;
      } else if (consecutiveWins === 5) {
        payoutMultiplier = 10;
        isBonusPayout = true;
      }

      await User.findOneAndUpdate(
        { _id: req.userId },
        { tokens: updatedUser.tokens + tokens * payoutMultiplier },
        { new: true }
      );

      return res.status(200).json({
        message: isBonusPayout
          ? `Congratulations you got bonus payout and got back ${
              tokens * payoutMultiplier
            }!`
          : `You won and got back ${tokens * payoutMultiplier}!`,
      });
    }

    return res.status(200).json({
      message: `You lost ${tokens}!`,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export default wager;
