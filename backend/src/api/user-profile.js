import User from "../models/user.js";

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({
      ...user._doc,
      coinTossResults: user.coinTossResults.slice(-10).reverse(),
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export default userProfile;
