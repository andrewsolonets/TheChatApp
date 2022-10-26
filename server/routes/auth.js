const {
  login,
  register,
  getAllUsers,
  setAvatar,
  userToken,
  logOut,
} = require("../controllers/userController");
const verifyAccessToken = require("../middleware/validateToken");

const router = require("express").Router();

router.post("/login", login);
router.get("/token", verifyAccessToken, userToken);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
