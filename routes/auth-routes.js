const router = require("express").Router();
const {
  signup,
  login,
  signUp,
  deleteUser,
  updatePassword,
  verifyToken,
} = require("../Controllers.js/Cont");

router.post("/signup", signup);
router.post("/login", login);
router.get("/signUp", signUp);
router.delete("/delete", deleteUser);
router.put("/update-password", updatePassword);
router.get("/user-details", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});

module.exports = router;
