const router = require("express").Router();

const {
    userSignUpController,
    signInHandler,
    authenticateToken,
    getUserController
} = require("./user.controller");

router.post("/user-signup", userSignUpController);
router.get("/user-signin", signInHandler);
router.get("/getUser", authenticateToken, getUserController);

module.exports = router;
