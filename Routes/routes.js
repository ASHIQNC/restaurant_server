const express = require("express");
const { register, login } = require("../Controls/authController");
const upload = require("../Middleware/multerMilddleware");

const {
  getAllData,
  getOneFood,
  createFoodData,
} = require("../Controls/controller");
const router = new express.Router();

router.post("/admin/register", register);

router.post("/admin/login", login);
router.get("/admin/getallfood", getAllData);
router.get("/admin/getonefood/:id", getOneFood);
router.post("/admin/uploadfood", upload.single("user_profile"), createFoodData);
module.exports = router;
